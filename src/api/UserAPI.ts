import BaseAPI from './BaseAPI';
import IUser, { IUserSearch } from '../interfaces/IUser';
import IPasswords from '../interfaces/IPasswords';

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    get(id: number) {
        return this.http.get(`/${id}`, {});
    }

    changeData(data: IUser) {
        return this.http.put('/profile', { data });
    }

    changeAvatar(data: FormData) {
        return this.http.put('/profile/avatar', {
            headers: {},
            noStringify: true,
            data,
        });
    }

    cnangePassword(data: IPasswords) {
        return this.http.put('/password', { data });
    }

    search(data: IUserSearch) {
        return this.http.post('/search', { data });
    }
}

export default new UserAPI();
