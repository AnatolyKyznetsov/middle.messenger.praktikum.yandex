import template from './chat.hbs';
import Component from '../../utils/Component';
import Avatar from '../avatar';

export default class Chat extends Component {
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
