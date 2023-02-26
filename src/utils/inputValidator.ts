import Component from './Component';

export default function inputValidator(component: Component): boolean {
    const input: HTMLInputElement = <HTMLInputElement>component.getContent();
    const isRequire: boolean = input.hasAttribute('require');
    const pattern: string = component.getProp('pattern');
    const repeat: string | undefined = input.dataset.repeat;

    let errorText = '';

    errorText = isRequire && !input.value ? 'Заполните это поле' : errorText;

    if (pattern) {
        const regExp = new RegExp(pattern);
        errorText = !regExp.test(input.value) ? 'Поле заполнено некорректно' : errorText;
    }

    if (repeat) {
        const target: HTMLInputElement | null = document.querySelector(`input[name="${repeat}"]`);
        errorText = target && input.value !== target.value ? 'Поля не совпадают' : errorText;
    }

    if (component.getProp('eventBus')) {
        component.getProp('eventBus').emit('showError', errorText);
    }

    return !errorText;
}
