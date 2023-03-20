import template from './input.hbs';
import Component from '../../utils/Component';
import InputController from '../../controllers/InputController';

interface IPropsInput {
    type?: string,
    className?: string,
    notEmpty?: boolean,
    accept?: string,
    value?: string,
    name?: string,
    placeholder?: string,
    attrs?: string,
    repeat?: string,
    pattern?: string,
    identifier?: string,
    events?: {
        focus?: () => void,
        blur?: () => void,
        input?: () => void,
    }
}

export default class Input extends Component<IPropsInput> {
    init() {
        this.props.events = {
            focus: () => {
                InputController.hideError(this.props.identifier);
            },
            input: () => {
                InputController.hideError(this.props.identifier);
            },
            blur: () => {
                InputController.validate(this);
            }
        };
    }

    clear() {
        const input: HTMLInputElement = <HTMLInputElement>this.element;
        input.value = '';
        input.classList.remove('not-empty');
    }

    get value() {
        const input: HTMLInputElement = <HTMLInputElement>this.element;

        return input.value;
    }

    componentDidMount() {
        if (!this.props.notEmpty) {
            this.clear();
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
