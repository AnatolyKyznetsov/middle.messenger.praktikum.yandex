import template from './icon.hbs';
import Component from '../../utils/Component';

interface IPropsIcon {
    src: string,
    className?: string,
    alt?: string | null,
}

export default class Icon extends Component<IPropsIcon> {
    render() {
        return this.compile(template, this.props);
    }
}
