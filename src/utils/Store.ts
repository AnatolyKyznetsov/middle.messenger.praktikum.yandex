import IState from '../interfaces/IState';
import EventBus from './EventBus';
import { set } from './helpers';

export enum StoreEvents {
    Updated = 'updated'
}

class Store extends EventBus {
    private state: IState = {};

    public set(key: string, value: unknown) {
        set(this.state, key, value);

        this.emit(StoreEvents.Updated, this.state);
    }

    public getState() {
        return this.state;
    }
}
const store = new Store();
// УБРАТЬ
(window as any).store = store
export default store;
