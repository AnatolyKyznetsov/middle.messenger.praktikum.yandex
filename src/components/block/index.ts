import template from './block.hbs';
import Component from '../../utils/Component';

export default class Block extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
