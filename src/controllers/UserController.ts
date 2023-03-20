import API, { UserAPI } from '../api/UserAPI';
import IUser, { IUserSearch } from '../interfaces/IUser';
import Store from '../utils/Store';
import IError from '../interfaces/IError';
import IPasswords from '../interfaces/IPasswords';
import store from '../utils/Store';
import IState from '../interfaces/IState';

export class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = API;
    }

    async get(id: number): Promise<IUser> {
        const user = await this.api.get(id) as IUser;

        return user;
    }

    changeData(data: IUser): void {
        this.call(async () => {
            const user = await this.api.changeData(data);
            Store.set('user.data', user);
        }, 'Данные изменены');
    }

    changeAvatar(data: HTMLInputElement | null): void {
        this.call(async () => {
            const formData: FormData = new FormData();
            formData.append(data!.name, data!.files![0]);

            const user = await this.api.changeAvatar(formData);
            Store.set('user.data', user);
        }, 'Загружен аватар');
    }

    changePassword(data: IPasswords):void {
        this.call(async () => {
            await this.api.cnangePassword(data);
        }, 'Пароль изменен');
    }

    async getFriendName(id: number): Promise<string> {
        let name: string | null = null;
        const state: IState = Store.getState();
        const friends: IUser[] | undefined = state.friends?.data;
        const isFriends: boolean = Array.isArray(friends);

        if (isFriends) {
            const user = friends?.find(e => e.id === id);

            name = user ? user.display_name : null;
        }

        if (name) {
            return name;
        }

        const user = await this.get(id) as IUser;
        Store.set('friends.data', isFriends ? [ ...friends!, user ]: [ user ]);

        return user.display_name;
    }

    async search(data: IUserSearch, callback?: () => void): Promise<void> {
        const users = await this.api.search(data) as IUser[];

        if (callback && users.length === 0) {
            callback();
        }

        Store.set('users.data', users);
    }

    clearMessage(): void {
        Store.set('user.status', null);
        Store.set('user.error', false);
    }

    getData(name: keyof IUser): string | number | undefined {
        const state: IState = store.getState();
        const userData: IUser | undefined = state.user?.data;

        return userData ? userData[name] : undefined;
    }

    getCurrent(): number | undefined {
        const state = Store.getState();
        return state.user?.data?.id;
    }

    loading(state: boolean): void {
        Store.set('user.isLoading', state);
    }

    async call(callback: () => void, status: string): Promise<void> {
        try {
            this.loading(true);
            await callback();

            this.loading(false);
            Store.set('user.error', false);
            Store.set('user.status', status);
        } catch (error: unknown) {
            Store.set('user.error', true);
            Store.set('user.status', (error as IError).reason);
            this.loading(false);
        }
    }
}

export default new UserController();
