import Component from '../utils/Component';
import Store from '../utils/Store';

enum Patterns {
    first_name = '^[A-Z|А-Я]{1}[a-z|а-я|-]{0,}$',
    second_name = first_name,
    login = '(?=.*[A-Z|a-z])[A-Z|a-z|\\d|-|_]{3,12}$',
    email = '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
    phone = '^[+]?\\d{10,15}$',
    password = '(?=.*[A-Z|А-Я])(?=.*[\\d])[\\w|А-Я|а-я]{8,40}',
    oldPassword = password,
    newPassword = password,
}

enum Errors {
    empty = 'Заполните это поле',
    incorrectly = 'Поле заполнено некорректно',
    doNotMatch = 'Поля не совпадают',
}

export class ValidatorController {
    call(component: Component): boolean {
        const input: HTMLInputElement = <HTMLInputElement>component.getContent();
        const isRequire: boolean = input.hasAttribute('require');
        const name: string = component.getProp('name');
        const pattern = Patterns[name as keyof typeof Patterns];
        const repeat: string | undefined = component.getProp('repeat');

        let errorText = undefined;

        errorText = isRequire && !input.value ? Errors.empty : errorText;

        if (pattern) {
            const regExp = new RegExp(pattern);
            errorText = !regExp.test(input.value) ? Errors.incorrectly : errorText;
        }

        if (repeat) {
            const target: HTMLInputElement | null = document.querySelector(`input[name='${repeat}']`);

            errorText = target && target.value !== input.value ? Errors.doNotMatch : errorText;
        }

        Store.emit(`showError:${component.getProp('identifier')}`, errorText);

        return !errorText;
    }
}

export default new ValidatorController();
