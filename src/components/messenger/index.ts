import template from './messenger.hbs';
import Component from '../../utils/Component';
import { Avatar } from '../avatar';
import Form from '../form';
import Input from '../input';
import Menu from '../menu';
import AttachFile from '../attach-file';
import ModalOpener from '../modal-opener';
import menuIcon from '../../../static/icons/menu.svg';
import clip from '../../../static/icons/clip.svg';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import IChats from '../../interfaces/IChats';
import ChatsController from '../../controllers/ChatsController';
import ModalController from '../../controllers/ModalController';
import MessageController from '../../controllers/MessageController';
import FormController from '../../controllers/FormController';
import Messages from '../messages';

interface IPropsMessenger {
    data?: IChats,
    chatId?: number | null,
    chatImg?: string | null,
    chatName?: string,
}

const avatar: Component = new Avatar({});
const messages: Component = new Messages({});

class Messenger extends Component<IPropsMessenger> {
    init() {
        this.children.messageList = messages;
        this.children.avatar = avatar;

        const sendMessageForm = new Form({
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
            ],
            callback: async (data: { message: string }) => {
                const chatId: number = ChatsController.getCurrentId();

                MessageController.send(chatId, data.message);
                FormController.clearForm();
            }
        });

        this.children.sendMessageForm = sendMessageForm;
    }

    componentDidUpdate() {
        const data: IChats | undefined = this.props.data;

        if (data) {
            const isOwner: boolean = ChatsController.isChatOwner(data.created_by);

            this.setProps({
                chatId: data.id,
                chatName: data.title,
            });

            avatar.setProps({
                display_name: data.title,
                avatar: data.avatar,
            });

            if (isOwner) {
                this.children.headMenu = new Menu({
                    icon: menuIcon,
                    iconAlt: 'Меню чата.',
                    content: [
                        new ModalOpener({
                            className: 'menu__item',
                            modalName: 'addUser',
                            label: 'Добавить пользователя',
                        }),
                        new ModalOpener({
                            className: 'menu__item',
                            modalName: 'removeUser',
                            label: 'Удалить пользователя',
                            callback: async () => {
                                ModalController.loading(true);
                                await ChatsController.getUsers(() => {
                                    ModalController.showError('Вы один в чате');
                                });
                                ModalController.loading(false);
                            },
                        }),
                        new ModalOpener({
                            className: 'menu__item menu__item_warning',
                            modalName: 'removeChat',
                            label: 'Удалить чат',
                        }),
                    ]
                });
            }
        } else {
            this.setProps({ chatId: undefined });
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.chat || {};
})(Messenger as typeof Component);
