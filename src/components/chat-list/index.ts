import template from './chat-list.hbs';
import Component from '../../utils/Component';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import IChats from '../../interfaces/IChats'
import Chat from '../../components/chat';
import ChatsController from '../../controllers/ChatsController';

interface IPropsChatList {
    isLodaing?: boolean,
    items?: Component[],
    data?: IChats[],
    currentId?: number
    current?: {
        data?: IChats,
    },
}

class ChatList extends Component<IPropsChatList> {
    init() {
        this.showChats();
    }

    componentDidUpdate() {
        this.showChats();
    }

    showChats() {
        const data: IChats[] | undefined = this.props.data;
        const items: Component[] = [];

        if (data) {
            data.forEach(item => {
                const chat = new Chat({
                    id: item.id,
                    owner: item.created_by,
                    avatarSrc: item.avatar,
                    name: item.title,
                    message: item.last_message,
                    count: item.unread_count,
                    isActive: item.id === this.props.currentId,
                    events: {
                        click: () => {
                            ChatsController.select(item.id);
                        }
                    }
                });

                items.push(chat);
            });

            this.children.items = items;
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    return state.chats || {};
})(ChatList as typeof Component);
