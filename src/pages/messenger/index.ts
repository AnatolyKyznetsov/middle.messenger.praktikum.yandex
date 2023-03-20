import template from './messenger.hbs';
import Component from '../../utils/Component';
import Link from '../../components/link';
import Text from '../../components/text';
import Avatar from '../../components/avatar';
import Input from '../../components/input';
import Icon from '../../components/icon';
import ChatList from '../../components/chat-list';
import Messenger from '../../components/messenger';
import Modal from '../../components/modal';
import Block from '../../components/block';
import Button from '../../components/button';
import Label from '../../components/label';
import plus from '../../../static/icons/plus.svg';
import Form from '../../components/form';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import ChatsController from '../../controllers/ChatsController';
import { Routes } from '../../utils/Router';
import ModalController from '../../controllers/ModalController';
import { INPUTS } from '../../config';
import UserController from '../../controllers/UserController';
import { IUserSearch } from '../../interfaces/IUser';
import UsersList from '../../components/users-list';

const createChatModal = new Modal({
    name: 'createChat',
    title: 'Создать чат',
    content: [
        new Form({
            buttonLable: 'Создать',
            content: [ new Label({ text: 'Название чата' }) ],
            events: {
                submit: async (e: Event) => {
                    e.preventDefault();

                    ModalController.action(createChatModal, async (value: string) => {
                        await ChatsController.create({ title: value });
                        await ChatsController.get({});
                    });
                }
            }
        }),
    ]
});

const removeChatModal = new Modal({
    name: 'removeChat',
    title: 'Удалить чат?',
    content: [
        new Block({
            className: 'modal__buttons',
            content: [
                new Button({
                    transparent: true,
                    label: 'Удалить',
                    events: {
                        click: async () => {
                            ModalController.action(removeChatModal, async () => {
                                await ChatsController.delete();
                                await ChatsController.get({});
                            });
                        }
                    }
                }),
                new Button({
                    label: 'Отмена',
                    events: {
                        click: () => {
                            ModalController.close('removeChat');
                        }
                    }
                }),
            ]
        })
    ]
});

const addUserModal = new Modal({
    name: 'addUser',
    title: 'Добавить пользователя',
    content: [
        new Form({
            buttonLable: 'Поиск',
            content: [ new Label(INPUTS.LOGIN) ],
            callback: async (data: IUserSearch) => {
                ModalController.loading(true);
                await UserController.search(data, () => {
                    ModalController.showError('Ничего не найдено');
                });
                ModalController.loading(false);
            }
        }),
        new UsersList({
            callback: async (id: number) => {
                const chatId: number = ChatsController.getCurrentId();
                ModalController.loading(true);

                try {
                    await ChatsController.addUsers({ users: [ id ], chatId });
                    ModalController.showMessage('Пользователь добавлен');
                } catch {
                    ModalController.showError('Что то пошло не такю Попробуйте ещё раз.');
                }

                ModalController.loading(false);
            }
        }),
    ]
});

const removeUserModal = new Modal({
    name: 'removeUser',
    title: 'Удалить пользователя',
    content: [
        new UsersList({
            callback: async (id: number) => {
                const chatId = ChatsController.getCurrentId();
                ModalController.loading(true);

                try {
                    await ChatsController.removeUsers({ users: [ id ], chatId });
                    await ChatsController.getUsers(() => {
                        ModalController.showError('Вы один в чате');
                    });
                } catch {
                    ModalController.showError('Что то пошло не такю Попробуйте ещё раз.');
                }

                ModalController.loading(false);
            }
        }),
    ]
});

const avatar = new Avatar({ showAlt: true });

const profileName = new Text({ className: 'sidebar__user-name' });

const profile = new Link({
    page: Routes.Profile,
    className: 'sidebar__profile',
    content: [ avatar, profileName ],
});

const inputSearch = new Input({
    placeholder: 'Поиск',
    className: 'input search__input',
});

const chatAddIcon = new Icon({
    src: plus,
    alt: 'Создать новый чат.',
    events: {
        click: () => {
            ModalController.open('createChat');
        }
    }
});

class MessengerPage extends Component {
    init() {
        if (ChatsController.isEmpty()) {
            ChatsController.get({});
        }

        this.children.messenger = new Messenger({});
        this.children.chatList = new ChatList({});
        this.children.modals = [ removeChatModal, removeUserModal, addUserModal, createChatModal ];
        this.children.profile = profile;
        this.children.inputSearch = inputSearch;
        this.children.chatAddIcon = chatAddIcon;
    }

    componentDidMount() {
        profileName.setProps({ text: this.props.data?.display_name });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.user || {};
})(MessengerPage);
