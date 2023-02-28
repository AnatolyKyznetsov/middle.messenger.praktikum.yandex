import template from './chat.hbs';
import Component from '../../utils/Component';
import Avatar from '../avatar';

interface IPropsChat {
    avatarSrc?: string | null,
    name: string,
    message?: string,
    lastDate?: string,
    count?: string | null,
}

export default class Chat extends Component<IPropsChat> {
    init() {
        this.children.avatar = new Avatar({
            name: this.props.name,
            src: this.props.avatarSrc,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
