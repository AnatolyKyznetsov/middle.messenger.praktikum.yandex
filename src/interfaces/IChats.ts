import { ILastMessage } from './IMessage';

export interface IChatsUsers {
    users: number[],
    chatId: number,
}

export interface IChatsDelete {
    chatId: number,
}

export interface IChatsCreate {
    title: string,
}

export interface IChatsGet {
    offset?: number,
    limit?: number,
    title?: string,
}

export default interface IChats {
    id: number,
    title: string,
    avatar: string,
    created_by: number
    unread_count: number,
    last_message: ILastMessage,
}
