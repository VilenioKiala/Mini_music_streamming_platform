export interface IUser {
    idUser: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

export interface IUpdateUser {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
}
