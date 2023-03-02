import template from './text.hbs';
import Component from '../../utils/Component';

interface IPropsText {
    text?: string,
    className?: string,
}

export default class Text extends Component<IPropsText> {
    render() {
        return this.compile(template, this.props);
    }
}
