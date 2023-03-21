import API, { AuthAPI } from '../api/AuthAPI';
import Store from '../utils/Store';
import Router, { Routes } from '../utils/Router';
import IUser from '../interfaces/IUser';
import ISigninData from '../interfaces/ISigninData';
import ISignupData from '../interfaces/ISignupData';
import IError from '../interfaces/IError';
import MessageController from './MessageController';

export class AuthController {
    private readonly api: AuthAPI;

    constructor() {
        this.api = API;
    }

    signin(data: ISigninData): void {
        this.call(async () => {
            await this.api.signin(data);
        });
    }

    signup(data: ISignupData): void {
        this.call(async () => {
            await this.api.signup(data);
        });
    }

    async getUser(): Promise<void> {
        const user = await this.api.read() as IUser;

        user.display_name = user.display_name === null ? `${user.first_name} ${user.second_name}` : user.display_name;

        Store.set('user.data', user);
    }

    async logout(): Promise<void> {
        await this.api.logout();

        Store.set('user.data', undefined);
        MessageController.closeAll();
        Router.go(Routes.Index);
    }

    async call(callback: () => void): Promise<void> {
        try {
            Store.set('user.isLoading', true);

            await callback();

            await this.getUser();

            Router.go(Routes.Messenger);
            Store.set('user.isLoading', false);
        } catch (error: unknown) {
            Store.set('user.error', true);
            Store.set('user.status', (error as IError).reason);
            Store.set('user.isLoading', false);
        }
    }
}

export default new AuthController();
