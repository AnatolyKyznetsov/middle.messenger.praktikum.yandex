import template from './link.hbs';
import Component from '../../utils/Component';
import withRouter from '../../hocs/withRouter';
import IPropsWithRouter from '../../interfaces/IPropsWithRouter';

interface IPropsLink extends IPropsWithRouter {
    page: string,
    className?: string,
    content: Component[] | string[],
    events?: {
        click:(e: Event) => void,
    },
}

class BaseLink extends Component<IPropsLink> {
    init() {
        if (this.props.page) {
            this.props.events = {
                ...this.props.events,
                click: (e: Event) => {
                    e.preventDefault();

                    this.props.router.go(this.props.page);
                }
            };
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withRouter(BaseLink);
