import template from './users-item.hbs';
import Component from '../../utils/Component';

interface IPropsUsersItem {
    id?: number,
    first_name?: string,
    second_name?: string,
    login?: string,
    events?: {
        click?: () => void,
    }
}

export default class UsersItem extends Component<IPropsUsersItem> {
    render() {
        return this.compile(template, this.props);
    }
}
