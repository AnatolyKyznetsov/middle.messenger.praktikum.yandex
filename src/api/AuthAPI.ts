import ISigninData from '../interfaces/ISigninData';
import ISignupData from '../interfaces/ISignupData';
import BaseAPI from './BaseAPI';

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signin(data: ISigninData) {
        return this.http.post('/signin', { data });
    }

    signup(data: ISignupData) {
        return this.http.post('/signup', { data });
    }

    read() {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }
}

export default new AuthAPI();
