import template from './profile.hbs';
import Component from '../../utils/Component';
import ButtonBack from '../../components/button-back';
import Avatar from '../../components/avatar';
import Link from '../../components/link';
import ProfileItem from '../../components/profile-item';
import IUser from '../../interfaces/IUser';
import user from '../../../static/data/user.json';
import TestNav from '../../components/test-nav';

const testNav = new TestNav();

const buttonBack = new ButtonBack({
    page: 'messenger',
});

const avatar = new Avatar({
    showAlt: true,
    big: true,
    name: 'Иван',
});

const links = [
    new Link({
        page: 'profile-change',
        content: [ 'Изменить данные' ],
        className: 'link',
    }),
    new Link({
        page: 'profile-change-password',
        content: [ 'Изменить пароль' ],
        className: 'link',
    }),
    new Link({
        page: 'login',
        content: [ 'Выйти' ],
        className: 'link link_warning',
    }),
];

const profileItems: Component[] = [];

user.data.forEach((item: IUser) => {
    const { name, value } = item;
    profileItems.push( new ProfileItem({ name, value }));
});

export default class Profile extends Component {
    init() {
        this.children.buttonBack = buttonBack;
        this.children.avatar = avatar;
        this.children.links = links;
        this.children.profileItems = profileItems;
        this.children.testNav = testNav;
    }

    render() {
        return this.compile(template, this.props);
    }
}
