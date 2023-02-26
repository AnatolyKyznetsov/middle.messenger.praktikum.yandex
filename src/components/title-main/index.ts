import template from './title-main.hbs';
import Component from '../../utils/Component';

export default class TitleMain extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
