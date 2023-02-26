import template from './input.hbs';
import Component from '../../utils/Component';
import inputValidator from '../../utils/inputValidator';

export default class Input extends Component {
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
