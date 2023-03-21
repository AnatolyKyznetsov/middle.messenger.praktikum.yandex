import template from './messages.hbs';
import Component from '../../utils/Component';
import withStore from '../../hocs/withStore';
import IState from '../../interfaces/IState';
import IMessage from '../../interfaces/IMessage';
import ChatsController from '../../controllers/ChatsController';
import Message from '../message';
import { localDate } from '../../utils/helpers';
import UserController from '../../controllers/UserController';

interface IPropsMessages {
    data?: IMessage[],
}

class Messages extends Component<IPropsMessages> {
    messageFrom(id: number): number | null {
        const userId: number | undefined = UserController.getCurrent();

        return userId !== id ? id : null;
    }

    showMessages() {
        const data: IMessage[] | undefined = this.props.data;
        const items: Component[] = [];

        if (data) {
            data.forEach((item) => {
                const message = new Message({
                    time: localDate(item.time),
                    message: item.content,
                    from: this.messageFrom(item.user_id),
                });

                items.push(message);
            });

            this.children.items = items;
        }
    }

    async componentDidUpdate() {
        await this.showMessages();

        this.element?.scroll(0, this.element!.scrollHeight);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default withStore((state: IState) => {
    const id = ChatsController.getCurrentId();
    return state.messages ? state.messages[id] : {};
})(Messages as typeof Component);
