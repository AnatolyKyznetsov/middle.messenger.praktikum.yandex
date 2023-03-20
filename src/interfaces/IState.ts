import IUser from './IUser';
import IChats from './IChats';
import IMessage from './IMessage';

type Messages = Record<number, {
    data: IMessage[];
}>;

export default interface IState {
    users?: {
        data: IUser[],
    },
    user?: {
        data?: IUser,
        error?: boolean,
        status?: string | null,
        isLoading?: boolean,
    },
    chats?: {
        data?: IChats[],
        currentId?: number,
        error?: boolean,
        isLoading?: boolean,
    },
    chat?: {
        data?: IChats,
    }
    modal?: {
        isLoading?: boolean,
    },
    friends?: {
        data: IUser[],
    },
    messages?: Messages,
}
