export interface IUserSearch {
    login: string
}

export default interface IUser {
    id: number;
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
    avatar: string,
    role?: string,
}
