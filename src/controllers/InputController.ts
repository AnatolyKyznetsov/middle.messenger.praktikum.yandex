import Component from '../utils/Component';
import Store from '../utils/Store';
import ValidateController from './ValidateController';

export class InputController {
    addEvent(component: Component): void {
        Store.on(`showError:${component.id}`, (text) => {
            const message = component.children.message as Component;
            message.setProps({ text });

            if (text) {
                component.element?.classList.add('error');
            }
        });

        Store.on(`hideErrors:${component.id}`, () => {
            component.element?.classList.remove('error');
        });
    }

    hideError(identifier: string | undefined): void {
        if (identifier) {
            Store.emit(`hideErrors:${identifier}`);
        }
    }

    validate(component: Component): void {
        const input: HTMLInputElement = <HTMLInputElement>component.element;

        ValidateController.call(component);

        if (input.value) {
            input.classList.add('not-empty');
        } else {
            input.classList.remove('not-empty');
        }
    }
}

export default new InputController();
