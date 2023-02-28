import template from './profile-item.hbs';
import Component from '../../utils/Component';

interface IPropsProfileItem {
    name: string,
    value: string,
}

export default class ProfileItem extends Component<IPropsProfileItem> {
    render() {
        return this.compile(template, this.props);
    }
}
