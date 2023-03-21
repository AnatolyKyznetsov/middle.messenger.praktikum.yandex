import template from './profile.hbs';
import Component from '../../utils/Component';
import ButtonBack from '../../components/button-back';
import Avatar from '../../components/avatar';
import Link from '../../components/link';
import AuthController from '../../controllers/AuthController';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import { Routes } from '../../utils/Router';

const buttonBack = new ButtonBack({
    page: Routes.Messenger,
});

const avatar = new Avatar({
    showAlt: true,
    big: true,
});

const links = [
    new Link({
        page: Routes.Settings,
        content: [ 'Изменить данные' ],
        className: 'link',
    }),
    new Link({
        page: Routes.SettingsPassword,
        content: [ 'Изменить пароль' ],
        className: 'link',
    }),
    new Link({
        content: [ 'Выйти' ],
        className: 'link link_warning',
        events: {
            click: () => {
                AuthController.logout();
            }
        }
    }),
];

class Profile extends Component {
    init() {
        this.children.buttonBack = buttonBack;
        this.children.avatar = avatar;
        this.children.links = links;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.user?.data || {};
})(Profile);
