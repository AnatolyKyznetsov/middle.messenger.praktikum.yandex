import template from './avatar.hbs';
import Component from '../../utils/Component';
import Input from '../input';

const input = new Input({
    type: 'file',
    className: 'avatar__input',
    name: 'avatar',
    accept: '.png, .jpg, .jpeg'
});

export default class Avatar extends Component {
    init() {
        this.children.input = input;
        this.props.name = this.props.name ? this.props.name[0] : this.props.name;
    }

    render() {
        return this.compile(template, this.props);
    }
}
