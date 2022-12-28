/* eslint-disable max-classes-per-file */
import { set, isEqual } from './helpers';
import EventBus from './EventBus';
import Block from './Block';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    console.log('NEW STATE: ', this.getState());
    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }

  // public clear() {
  //   this.state = {};
  // }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block) {
    let previousState: any;

    return class WithStore extends Component {
      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          console.log('STORE1 stateProps', stateProps);
          // check
          if (!isEqual(previousState, stateProps)) {
            console.log('in store!');
            this.setProps({ ...stateProps });
            console.log('completed update store!');
          }

          previousState = { ...stateProps };
          console.log('STORE2 stateProps', stateProps);

          // this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export const withUser = withStore((state) => (state.user || {}));

export default store;
