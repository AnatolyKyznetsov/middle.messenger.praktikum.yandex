import template from './modal.hbs';
import Component from '../../utils/Component';
import Title from '../title-section';
import EventBus from '../../utils/EventBus';

interface IPropsModal {
    name: string,
    title: string,
    content: Component[],
    eventBus: EventBus,
    events?: {
        click: (e: Event) => void,
    },
}

export default class Modal extends Component<IPropsModal> {
    init() {
        if (this.props.eventBus) {
            this.props.eventBus.on(`open_modal:${this.props.name}`, () => {
                this.getContent()?.classList.add('modal_active');
            });

            this.props.eventBus.on(`close_modal:${this.props.name}`, () => {
                this.getContent()?.classList.remove('modal_active');
            });
        }

        this.children.title = new Title({
            className: 'shape__title',
            text: this.props.title,
        });

        this.props.events = {
            click: (e: Event) => {
                const target = e.target as HTMLElement;

                if (!target.closest('.shape')) {
                    this.getContent()?.classList.remove('modal_active');
                }
            },
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}
