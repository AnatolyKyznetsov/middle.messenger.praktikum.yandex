import template from './label.hbs';
import Component from '../../utils/Component';
import Input from '../input';
import Text from '../text';
import Tooltip from '../tooltip';
import InputController from '../../controllers/InputController';

interface IPropsLabel {
    className?: string,
    error?: boolean,
    text?: string,
    type?: string,
    notEmpty?: boolean,
    value?: string,
    name?: string,
    attrs?: string,
    repeat?: string,
}

enum Tooltips {
    first_name = 'Первая буква должна быть заглавной, без пробелов и без цифр,допустим дефис',
    second_name = first_name,
    login = 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, допустимы дефис и нижнее подчёркивание.',
    phone = 'Без пробелов, состоит из цифр, может начинается с плюса',
    password = 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    oldPassword = password,
    newPassword = password,
}

export default class Label extends Component<IPropsLabel> {
    init() {
        const tooltip: string = Tooltips[this.props.name as keyof typeof Tooltips];

        this.children.message = new Text({
            className: 'label__message',
        });

        this.children.input = new Input({
            className: 'label__input',
            type: this.props.type,
            value: this.props.value,
            name: this.props.name,
            attrs: this.props.attrs,
            repeat: this.props.repeat,
            notEmpty: this.props.notEmpty,
            identifier: this.id,
        });

        if (tooltip) {
            this.children.tooltip = new Tooltip({
                className: 'label__tooltip',
                posX: 'left',
                posY: 'bottom',
                text: tooltip,
            });
        }

        if (this.props.name || this.props.repeat) {
            InputController.addEvent(this);
        }
    }

    componentDidMount() {
        this.element?.classList.remove('error');
    }

    render() {
        return this.compile(template, this.props);
    }
}
