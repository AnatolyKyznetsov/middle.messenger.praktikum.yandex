import template from './avatar.hbs';
import Component from '../../utils/Component';
import Input from '../input';

interface IPropsAvatar {
    className?: string,
    big?: boolean,
    load?: boolean,
    src?: string | null,
    showAlt?: boolean,
    name?: string,
    input?: Input,
}

export default class Avatar extends Component<IPropsAvatar> {
    init() {
        this.children.input = new Input({
            type: 'file',
            className: 'avatar__input',
            name: 'avatar',
            accept: '.png, .jpg, .jpeg'
        });
        this.props.name = this.props.name ? this.props.name[0] : this.props.name;
    }

    render() {
        return this.compile(template, this.props);
    }
}
