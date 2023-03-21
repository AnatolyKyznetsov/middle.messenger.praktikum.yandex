import Input from '../components/input';
import Component from '../utils/Component';
import Store from '../utils/Store';
import FormController from './FormController';

export class ModalController {
    addEvents(component: Component): void {
        Store.on(`open_modal:${component.getProp('name')}`, () => {
            component.setProps({ isActive: true });
        });

        Store.on(`close_modal:${component.getProp('name')}`, () => {
            component.setProps({ isActive: false });
            this.clearMessage();
        });
    }

    open(name: string): void {
        Store.emit(`open_modal:${name}`);
    }

    close(name: string): void {
        Store.emit(`close_modal:${name}`);
    }

    loading(state: boolean): void {
        Store.set('modal.isLoading', state);
    }

    async action(component: Component, callback: (value: string) => void): Promise<void> {
        const input = FormController.getInput(component) as Input | null;

        this.loading(true);

        callback(input && input.value ? input.value : '');

        if (input) {
            input.clear();
        }

        this.loading(false);

        this.close(component.getProp('name'));
    }

    showMessage(text: string): void {
        Store.set('modal.message', text);
    }

    showError(text: string): void {
        Store.set('modal.error', true);
        this.showMessage(text);
    }

    clearMessage(): void {
        Store.set('modal.message', null);
        Store.set('modal.error', false);
    }
}

export default new ModalController();
