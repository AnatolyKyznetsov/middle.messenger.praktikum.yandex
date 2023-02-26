import template from './tooltip.hbs';
import Component from '../../utils/Component';

export default class Tooltip extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
