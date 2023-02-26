import template from './modal-opener.hbs';
import Component from '../../utils/Component';

export default class ModalOpener extends Component {
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
