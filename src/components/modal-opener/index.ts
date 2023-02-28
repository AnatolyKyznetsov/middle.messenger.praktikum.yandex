import template from './modal-opener.hbs';
import Component from '../../utils/Component';
import EventBus from '../../utils/EventBus';

interface IPropsModalOpener {
    modalName: string,
    label: string,
    className?: string,
    eventBus: EventBus,
    events?: {
        click: () => void,
    },
}

export default class ModalOpener extends Component<IPropsModalOpener> {
    init() {
        this.props.events = {
            click: () => {
                if (this.props.eventBus) {
                    this.props.eventBus.emit(`open_modal:${this.props.modalName}`);
                }
            }
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}
