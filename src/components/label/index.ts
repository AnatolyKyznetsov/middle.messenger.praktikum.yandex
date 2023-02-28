import template from './label.hbs';
import Component from '../../utils/Component';
import EventBus from '../../utils/EventBus';
import Input from '../input';
import Text from '../text';
import Tooltip from '../tooltip';

interface IPropsLabel {
    className?: string,
    error?: boolean,
    text: string,
    tooltip?: string,
    type?: string,
    notEmpty?: boolean,
    value?: string,
    name?: string,
    attrs?: string,
    repeat?: string,
    pattern?: string,
}

export default class Label extends Component<IPropsLabel> {
    init() {
        const props = this.props;
        const eventBus: EventBus = new EventBus;

        const message: Component = new Text({
            className: 'label__message',
        });

        eventBus.on('showError', (text = '') => {
            message.setProps({
                text: text,
            });

            if (text !== '') {
                this.getContent()?.classList.add('error');
            }
        });

        eventBus.on('hideErrors', () => {
            this.getContent()?.classList.remove('error');
        });

        this.children.message = message;

        this.children.input = new Input({
            className: 'label__input',
            type: props.type,
            value: props.value,
            name: props.name,
            attrs: props.attrs,
            pattern: props.pattern,
            repeat: props.repeat,
            notEmpty: props.notEmpty,
            eventBus: eventBus,
        });

        if (props.tooltip) {
            this.children.tooltip = new Tooltip({
                className: 'label__tooltip',
                posX: 'left',
                posY: 'bottom',
                text: props.tooltip,
            });
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
