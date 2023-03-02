import template from './input.hbs';
import Component from '../../utils/Component';
import inputValidator from '../../utils/inputValidator';
import EventBus from '../../utils/EventBus';

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
    eventBus?: EventBus,
    events?: {
        focus: () => void,
        blur: () => void,
    }
}

export default class Input extends Component<IPropsInput> {
    init() {
        this.props.events = {
            focus: () => {
                if (this.props.eventBus) {
                    this.props.eventBus.emit('hideErrors');
                }
            },
            blur: () => {
                const input: HTMLInputElement = <HTMLInputElement>this.getContent();

                inputValidator(this);

                if (input.value) {
                    input.classList.add('not-empty');
                } else {
                    input.classList.remove('not-empty');
                }
            }
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}
