import template from './messenger.hbs';
import Component from '../../utils/Component';
import EventBus from '../../utils/EventBus';
import Link from '../../components/link';
import Text from '../../components/text';
import Avatar from '../../components/avatar';
import Input from '../../components/input';
import Icon from '../../components/icon';
import Chat from '../../components/chat';
import Messenger from '../../components/messenger';
import Modal from '../../components/modal';
import Block from '../../components/block';
import Button from '../../components/button';
import Label from '../../components/label';
import IChats from '../../interfaces/IChats';
import chats from '../../../static/data/chats.json';
import messages from '../../../static/data/messages.json';
import plus from '../../../static/icons/plus.svg';
import TestNav from '../../components/test-nav';

const testNav = new TestNav();

const eventBus = new EventBus();

const modals: Component[] = [
    new Modal({
        name: 'removeChat',
        title: 'Удалить чат?',
        eventBus: eventBus,
        content: [
            new Block({
                className: 'modal__buttons',
                content: [
                    new Button({
                        transparent: true,
                        label: 'Удалить',
                    }),
                    new Button({
                        label: 'Отмена',
                        events: {
                            click: () => {
                                eventBus.emit('close_modal:removeChat');
                            }
                        }
                    }),
                ]
            })
        ]
    }),
    new Modal({
        name: 'removeUser',
        title: 'Удалить пользователя',
        eventBus: eventBus,
        content: [
            new Label({
                text: 'Логин',
                name: 'login',
            }),
            new Button({
                label: 'Удалить',
            })
        ]
    }),
    new Modal({
        name: 'addUser',
        title: 'Добавить пользователя',
        eventBus: eventBus,
        content: [
            new Label({
                text: 'Логин',
                name: 'login',
            }),
            new Button({
                label: 'Добавить',
            })
        ]
    }),
];

const messenger = new Messenger({
    chatId: '1',
    chatName: 'Обучение',
    messages: messages.data,
    eventBus: eventBus,
});

const chatItems: Component[] = [];

chats.data.forEach((item: IChats) => {
    chatItems.push(
        new Chat({
            name: item.name,
            avatarSrc: item.img,
            lastDate: item.date,
            count: item.count,
            message: item.message,
        })
    );
});

const profile = new Link({
    page: 'profile',
    className: 'sidebar__profile',
    content: [
        new Avatar({
            name: 'Иван',
            showAlt: true,
        }),
        new Text({
            className: 'sidebar__user-name',
            text: 'Иван',
        }),
    ],
});

const inputSearch = new Input({
    placeholder: 'Поиск',
    className: 'input search__input',
});

const chatAddIcon = new Icon({
    src: plus,
    alt: 'Создать новый чат.',
});

export default class MessengerPage extends Component {
    init() {
        this.children.profile = profile;
        this.children.inputSearch = inputSearch;
        this.children.chatItems = chatItems;
        this.children.chatAddIcon = chatAddIcon;
        this.children.messenger = messenger;
        this.children.modals = modals;
        this.children.testNav = testNav;
    }

    render() {
        return this.compile(template, this.props);
    }
}
