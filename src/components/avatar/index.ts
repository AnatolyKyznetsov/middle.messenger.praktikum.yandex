import template from './avatar.hbs';
import Component from '../../utils/Component';
import Input from '../input';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import { RESOURCES_URL } from '../../config';

interface IPropsAvatar {
    className?: string,
    big?: boolean,
    load?: boolean,
    src?: string | null,
    showAlt?: boolean,
    display_name?: string,
    firstLetter?: string,
    avatar?: string | null,
    input?: typeof Input,
    events?: {
        change: (e: Event) => void,
    }
}

export class Avatar extends Component<IPropsAvatar> {
    init() {
        this.children.input = new Input({
            type: 'file',
            className: 'avatar__input',
            name: 'avatar',
            accept: '.png, .jpg, .jpeg'
        });
    }

    componentDidUpdate() {
        this.props.firstLetter = this.props.display_name ? this.props.display_name[0] : undefined;

        if (this.props.avatar) {
            this.props.src = `${RESOURCES_URL}${this.props.avatar}`;
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.user?.data || {};
})(Avatar as typeof Component);
