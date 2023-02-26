import template from './profile-item.hbs';
import Component from '../../utils/Component';

export default class ProfileItem extends Component {
    render() {
        return this.compile(template, this.props);
    }
}
