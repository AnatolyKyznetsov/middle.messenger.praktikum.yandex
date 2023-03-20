import API, { ChatsAPI } from '../api/ChatsAPI';
import IChats, { IChatsCreate, IChatsGet, IChatsUsers } from '../interfaces/IChats';
import IState from '../interfaces/IState';
import IUser from '../interfaces/IUser';
import Store from '../utils/Store';
import MessageController from './MessageController';

type Token = {
    token: string,
}

export class ChatsController {
    private readonly api: ChatsAPI;

    constructor() {
        this.api = API;
    }

    async create(data: IChatsCreate): Promise<void> {
        await this.api.create(data);
    }

    async get(data: IChatsGet, loading = true): Promise<void> {
        if (loading) {
            this.loading(true);
        }

        const chats = await this.api.get(data) as IChats[];

        chats.map(async (chat) => {
            await MessageController.connect(chat.id, async () => {
                const data = await this.getToken(chat.id) as { token: string };
                return data.token;
            });
        });

        Store.set('chats.data', chats);

        if (loading) {
            this.loading(false);
        }
    }

    async delete(): Promise<void> {
        const id: number = this.getCurrentId();

        Store.set('chats.currentId', undefined);
        Store.set('chat.data', {});

        await this.api.delete({ chatId: id });
        MessageController.close(id);
    }

    async addUsers(data: IChatsUsers): Promise<void> {
        await this.api.addUsers(data);
    }

    async getUsers(callback?: () => void): Promise<void> {
        const currentId: number = this.getCurrentId();

        const users = await this.api.getUsers(currentId) as IUser[];
        const otherUsers: IUser[] = users.filter(e => e.role !== 'admin')

        if (callback && otherUsers.length === 0) {
            callback();
        }

        Store.set('users.data', otherUsers);
    }

    async removeUsers(data: IChatsUsers): Promise<void> {
        await this.api.removeUsers(data);
    }

    async getToken(id: number): Promise<Token> {
        const token = await this.api.getToken(id) as Token;

        return token;
    }

    isChatOwner(ownerId: number): boolean {
        const state: IState = Store.getState();
        const userId = state.user!.data!.id as number;

        return userId === ownerId;
    }

    isEmpty(): boolean {
        const state: IState = Store.getState();

        return !(state.chats && state.chats.data);
    }

    loading(state: boolean): void {
        Store.set('chats.isLoading', state);
    }

    select(id: number): void {
        const state: IState = Store.getState();
        const chats: IChats[] | undefined = state.chats?.data;
        const chat: IChats | undefined = chats!.find(e => e.id === id);

        Store.set('chats.currentId', id);
        Store.set('chat.data', JSON.parse(JSON.stringify(chat)));
    }

    getCurrentId(): number {
        const state: IState = Store.getState();
        const id = state.chats?.currentId as number;

        return id;
    }
}

export default new ChatsController();
