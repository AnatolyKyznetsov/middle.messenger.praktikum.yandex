import template from './modal-opener.hbs';
import Component from '../../utils/Component';
import ModalController from '../../controllers/ModalController';

interface IPropsModalOpener {
    modalName: string,
    label: string,
    className?: string,
    events?: {
        click: () => void,
    },
    callback?: () => void,
}

export default class ModalOpener extends Component<IPropsModalOpener> {
    init() {
        this.props.events = {
            click: () => {
                ModalController.open(this.props.modalName);

                if (this.props.callback) {
                    this.props.callback()
                }
            }
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}
