export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface IUpdateUser {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
}
