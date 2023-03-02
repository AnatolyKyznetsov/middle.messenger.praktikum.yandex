import template from './title-section.hbs';
import Component from '../../utils/Component';

interface IPropsTitleSection {
    text?: string,
    className?: string,
}

export default class TitleSection extends Component<IPropsTitleSection> {
    render() {
        return this.compile(template, this.props);
    }
}
