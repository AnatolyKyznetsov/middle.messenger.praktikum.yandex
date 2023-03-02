import template from './test-nav.hbs';
import Component from '../../utils/Component';
import Link from '../link';

export default class TestNav extends Component {
    init() {
        this.children.links = [
            new Link({
                className: 'link',
                page: '404',
                content: [ '404' ],
            }),
            new Link({
                className: 'link',
                page: '500',
                content: [ '500' ],
            }),
            new Link({
                className: 'link',
                page: 'login',
                content: [ 'Вход' ],
            }),
            new Link({
                className: 'link',
                page: 'registration',
                content: [ 'Регистрация' ],
            }),
            new Link({
                className: 'link',
                page: 'messenger',
                content: [ 'Мессенджер' ],
            }),
            new Link({
                className: 'link',
                page: 'profile',
                content: [ 'Профиль' ],
            }),
            new Link({
                className: 'link',
                page: 'profile-change',
                content: [ 'Профиль - Изменить данные' ],
            }),
            new Link({
                className: 'link',
                page: 'profile-change-password',
                content: [ 'Профиль - Изменить пароль' ],
            }),
        ];
    }

    render() {
        return this.compile(template, this.props);
    }
}
