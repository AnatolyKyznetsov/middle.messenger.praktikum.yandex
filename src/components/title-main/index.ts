import template from './title-main.hbs';
import Component from '../../utils/Component';

interface IPropsTitleMain {
    text?: string,
    className?: string,
}

export default class TitleMain extends Component<IPropsTitleMain> {
    render() {
        return this.compile(template, this.props);
    }
}
