import template from './messenger.hbs';
import Component from '../../utils/Component';
import Text from '../text';
import Avatar from '../avatar';
import Form from '../form';
import Input from '../input';
import Menu from '../menu';
import AttachFile from '../attach-file';
import ModalOpener from '../modal-opener';
import Message from '../message';
import menuIcon from '../../../static/icons/menu.svg';
import clip from '../../../static/icons/clip.svg';
import EventBus from '../../utils/EventBus';
import { IMessagesData, IMessages } from '../../interfaces/IMessages';

interface IPropsMessenger {
    chatId?: string | null,
    chatImg?: string | null,
    chatName: string,
    messages?: IMessages[],
    eventBus: EventBus,
}

export default class Messenger extends Component<IPropsMessenger> {
    init() {
        this.children.avatar = new Avatar({
            name: this.props.chatName,
            src: this.props.chatImg,
            showAlt: true,
        });

        this.children.headMenu = new Menu({
            icon: menuIcon,
            iconAlt: 'Меню чата.',
            content: [
                new ModalOpener({
                    className: 'menu__item',
                    modalName: 'addUser',
                    label: 'Добавить пользователя',
                    eventBus: this.props.eventBus,
                }),
                new ModalOpener({
                    className: 'menu__item',
                    modalName: 'removeUser',
                    label: 'Удалить пользователя',
                    eventBus: this.props.eventBus,
                }),
                new ModalOpener({
                    className: 'menu__item menu__item_warning',
                    modalName: 'removeChat',
                    label: 'Удалить чат',
                    eventBus: this.props.eventBus,
                }),
            ]
        });

        if (this.props.messages) {
            const messageItems: Component[] = [];

            this.props.messages.forEach((item: IMessages) => {
                messageItems.push(
                    new Text({
                        className: 'messenger__text',
                        text: item.date
                    })
                );

                item.data.forEach((element: IMessagesData) => {
                    messageItems.push(
                        new Message({
                            from: element.from,
                            time: element.time,
                            message: element.message,
                            images: element.images,
                        })
                    );
                });
            });

            this.children.messageItems = messageItems;
        }

        this.children.sendMessageForm = new Form({
            className: 'messenger__form',
            iconButton: true,
            content: [
                new Menu({
                    icon: clip,
                    iconAlt: 'Прикрепить к сообщению.',
                    posX: 'right',
                    posY: 'top',
                    content: [
                        new AttachFile({
                            name: 'media',
                            accept: 'image/*',
                            text: 'Прикрепить фото',
                        }),
                        new AttachFile({
                            name: 'file',
                            text: 'Прикрепить файл',
                        }),
                    ]
                }),
                new Input({
                    placeholder: 'Сообщение',
                    className: 'input',
                    name: 'message',
                    attrs: 'require',
                }),
            ]
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
