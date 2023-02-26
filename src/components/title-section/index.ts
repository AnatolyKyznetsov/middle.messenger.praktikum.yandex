import template from './title-section.hbs';
import Component from '../../utils/Component';

export default class TitleSection extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
