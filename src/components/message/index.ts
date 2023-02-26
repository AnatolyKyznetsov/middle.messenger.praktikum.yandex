import template from './message.hbs';
import Component from '../../utils/Component';
import indicator from '../../../static/icons/indicator.svg';

export default class Message extends Component {
    init() {
        this.props.indicator = indicator;
    }

    render() {
        return this.compile(template, this.props);
    }
}
