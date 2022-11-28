import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  static componentName: string;

  public id = nanoid(6);

  private _element: HTMLElement | null = null;

  private _meta: { props: any };

  props: any;

  protected children: Record<string, Block>;

  private eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */

  constructor(propsAndChildren: any = {}) {
    const eventBus = new EventBus();
    const { props, children } = this.getPropsAndChildren(propsAndChildren);

    this.children = children;

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props);

    this.initChildren();

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
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
    this.componentDidMount();
  }

  protected componentDidMount() {

  }

  dispatchComponentDidMoun() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
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
    console.log('this.props: ', this.props);
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

  _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
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
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events } = this.props as any;

    if (!events) { return; }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(templateString: string, context: any) {
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    // const htmlString = template(context);
    // console.log('htmlString: ', htmlString);

    // Object.entries(this.children).forEach(([key, child]) => {
    //   if (Array.isArray(child)) {
    //     context[key] = child.map((ch) => `<div data-id="id-${ch.id}"></div>`);

    //     return;
    //   }

    //   context[key] = `<div data-id="id-${child.id}"></div>`;
    // });

    const template = Handlebars.compile(templateString);
    const htmlString = template({ ...context, children: this.children });

    fragment.innerHTML = htmlString;

    console.log('fragment: ', fragment.innerHTML);
    console.log('template: ', template);
    console.log('context: ', context);

    Object.entries(this.children).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  getPropsAndChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => (v instanceof Block))) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  protected initChildren() {

  }

  // show() {
  //   this.getContent().style.display = "block";
  // }

  // hide() {
  //   this.getContent().style.display = "none";
  // }
}

export default Block;
