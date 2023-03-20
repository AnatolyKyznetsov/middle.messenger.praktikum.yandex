import template from './users-list.hbs';
import Component from '../../utils/Component';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import IUser from '../../interfaces/IUser';
import UsersItem from '../users-item';

interface IPropsUsersList {
    data?: IUser[],
    callback: (id: number) => void,
}

class UsersList extends Component<IPropsUsersList> {
    componentDidUpdate() {
        const data: IUser[] | undefined = this.props.data;
        const items: Component[] = [];

        if (data) {
            data.forEach(item => {
                const user = new UsersItem({
                    first_name: item.first_name,
                    second_name: item.second_name,
                    login: item.login,
                    events: {
                        click: () => {
                            this.props.callback(item.id);
                        }
                    }
                });

                items.push(user);
            });

            this.children.items = items;
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.users || {};
})(UsersList as typeof Component);
