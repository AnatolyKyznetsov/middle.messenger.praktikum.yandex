export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_URL = `${API_URL}/resources`;
export const WS_URL = 'wss://ya-praktikum.tech/ws/chats';

export const INPUTS = {
    LOGIN: {
        text: 'Логин',
        name: 'login',
        attrs: 'require',
    },
    PASSWORD: {
        text: 'Пароль',
        name: 'password',
        type: 'password',
        attrs: 'require',
    },
    FIRST_NAME: {
        text: 'Имя',
        name: 'first_name',
        attrs: 'require',
    },
    SECOND_NAME: {
        text: 'Фамилия',
        name: 'second_name',
        attrs: 'require',
    },
    DISPLAY_NAME: {
        text: 'Имя в чате',
        name: 'display_name',
        attrs: 'require',
    },
    EMAIL: {
        text: 'Почта',
        name: 'email',
        attrs: 'require',
    },
    PHONE: {
        text: 'Телефон',
        name: 'phone',
        attrs: 'require',
    },
    PASSWORD_REPEAT: {
        text: 'Пароль (ещё раз)',
        type: 'password',
        attrs: 'require',
        repeat: 'password',
    },
    OLD_PASSWORD: {
        text: 'Старый пароль',
        name: 'oldPassword',
        type: 'password',
        attrs: 'require',
    },
    NEW_PASSWORD: {
        text: 'Новый пароль',
        name: 'newPassword',
        type: 'password',
        attrs: 'require',
    },
    NEW_PASSWORD_REPEAT: {
        text: 'Новый пароль (ещё раз)',
        type: 'password',
        attrs: 'require',
        repeat: 'newPassword',
    },
}
