import template from './attach-file.hbs';
import Component from '../../utils/Component';
import Input from '../input';

interface IPropsAttachFile {
    text: string,
    name: string,
    accept?: string,
}

export default class AttachFile extends Component<IPropsAttachFile> {
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
