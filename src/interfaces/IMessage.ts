import IUser from './IUser';

export interface ILastMessage {
    user: IUser,
    time: string,
    content: string,
}

export default interface IMessage {
    chat_id: number;
    time: string;
    type: string;
    user_id: number;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    }
}
