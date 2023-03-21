import { IChatsCreate, IChatsGet, IChatsDelete , IChatsUsers } from '../interfaces/IChats';
import BaseAPI from './BaseAPI';

export class ChatsAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    create(data: IChatsCreate) {
        return this.http.post('', { data });
    }

    get(data: IChatsGet) {
        return this.http.get('', { data });
    }

    delete(data: IChatsDelete) {
        return this.http.delete('', { data });
    }

    addUsers(data: IChatsUsers) {
        return this.http.put('/users', { data });
    }

    removeUsers(data: IChatsUsers) {
        return this.http.delete('/users', { data });
    }

    getUsers(id: number) {
        return this.http.get(`/${id}/users`, {});
    }

    getToken(id: number) {
        return this.http.post(`/token/${id}`, {});
    }
}

export default new ChatsAPI();
