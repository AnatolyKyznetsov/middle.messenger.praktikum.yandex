import template from './chat.hbs';
import Component from '../../utils/Component';
import { Avatar } from '../avatar';
import { ILastMessage } from '../../interfaces/IMessage';
import { localDate } from '../../utils/helpers';

interface IPropsChat {
    id?: number,
    owner?: number,
    avatarSrc?: string | null,
    name: string,
    message?: ILastMessage,
    lastDate?: string,
    count?: number | null,
    isActive?: boolean,
    events?: {
        click?: () => void,
    }
}

export default class Chat extends Component<IPropsChat> {
    init() {
        this.children.avatar = new Avatar();
        this.children.avatar.setProps({
            display_name: this.props.name,
            avatar: this.props.avatarSrc,
        });

        if (this.props?.message?.time) {
            this.setProps({
                lastDate: localDate(this.props.message.time),
            });
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}
