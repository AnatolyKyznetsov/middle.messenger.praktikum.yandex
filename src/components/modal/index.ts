import template from './modal.hbs';
import Component from '../../utils/Component';
import Title from '../title-section';
import ModalController from '../../controllers/ModalController';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';

interface IPropsModal {
    isLoading?: boolean,
    isActive?: boolean,
    name: string,
    title: string,
    content: Component[],
    events?: {
        click: (e: Event) => void,
    },
}

class Modal extends Component<IPropsModal> {
    init() {
        ModalController.addEvents(this);

        this.children.title = new Title({
            className: 'shape__title',
            text: this.props.title,
        });

        this.props.events = {
            click: (e: Event) => {
                const target = e.target as HTMLElement;

                if (!target.closest('.shape')) {
                    ModalController.close(this.props.name);
                }
            },
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.modal || {};
})(Modal as typeof Component);
