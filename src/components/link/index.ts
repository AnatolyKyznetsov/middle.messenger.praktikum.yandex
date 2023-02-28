import template from './link.hbs';
import Component from '../../utils/Component';
import renderDOM from '../../utils/renderDOM';

interface IPropsLink {
    page: string,
    className?: string,
    content: Component[] | string[],
    events?: {
        click:(e: Event) => void,
    },
}

export default class Link extends Component<IPropsLink> {
    init() {
        this.props.events = {
            ...this.props.events,
            click: (e: Event) => {
                e.preventDefault();
                renderDOM(this.props.page);
            }
        };
    }

    render() {
        return this.compile(template, this.props);
    }
}
