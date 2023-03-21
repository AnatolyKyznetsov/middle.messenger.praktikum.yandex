import IState from '../interfaces/IState';
import Component from '../utils/Component';
import store, { StoreEvents } from '../utils/Store';

export default function withStore(mapStateToProps: (state: IState) => any) {
    return function wrap(component: typeof Component) {
        let previousState: IState;

        return class WithStore extends component {
            constructor(props: any) {
                previousState = mapStateToProps(store.getState());

                super({ ...props, ...previousState });

                store.on(StoreEvents.Updated, () => {
                    const stateProps: IState = mapStateToProps(store.getState());

                    this.setProps({ ...stateProps });
                    previousState = stateProps;
                });
            }
        }
    }
}
