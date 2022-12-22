import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

type BlockEvents<P = any> = {
  init: [];
  'flow:component-did-mount': [];
  'flow:component-did-update': [P, P];
  'flow:render': [];
};

type Props<P extends Record<string, unknown> = any> = { events?: Record<string, () => void> } & P;

class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public id = nanoid(6);

  private _element: HTMLElement | null = null;

  // private _meta: { props: any };

  protected props: Props<P>;

  protected children: Record<string, Block>;

  private eventBus: () => EventBus<BlockEvents<Props<P>>>;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus<BlockEvents<Props<P>>>();
    const { props, children } = this.getPropsAndChildren(propsAndChildren);

    this.children = children;

    // this._meta = {
    //   props,
    // };

    this.props = this._makePropsProxy(props);

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<BlockEvents>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    // this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          item.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
    this.componentDidMount();
  }

  protected componentDidMount() {

  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      console.log('UPDATE', oldProps, newProps);
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
    return true;
  }

  setProps = (nextProps: Partial<Props<P>>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    const templateString = this.render();
    const fragment = this.compile(templateString, { ...this.props });
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.element) {
      this._removeEvents();
      this._element?.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: Props<P>) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop, value) {
        const oldProps = { ...target };
        let newTarget = target[prop as keyof Props<P>];
        newTarget = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newTarget);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _removeEvents() {
    const { events } = this.props as any;

    if (!events || !this.element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event as any, listener as any);
    });
  }

  _addEvents() {
    const { events } = this.props as any;

    if (!events) { return; }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event as any, listener as any);
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(templateString: string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    const template = Handlebars.compile(templateString);
    const htmlString = template({ ...context, children: this.children });

    fragment.innerHTML = htmlString;

    Object.entries(this.children).forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  getPropsAndChildren(propsAndChildren: Props<P>):
  { props: Props<P>, children: Record<string, Block> } {
    const children: Record<string, Block> = {};
    const props = {} as Record<string, unknown>;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => (v instanceof Block))) {
        children[key] = value as any;
      } else {
        props[key] = value;
      }
    });

    return { props: props as Props<P>, children };
  }

  protected initChildren() {

  }
}

export default Block;
