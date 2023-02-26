import template from './attach-file.hbs';
import Component from '../../utils/Component';
import Input from '../input';

export default class AttachFile extends Component {
    init() {
        this.children.input = new Input({
            type: 'file',
            name: this.props.name,
            accept: this.props.accept,
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
