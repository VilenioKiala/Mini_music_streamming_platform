import { IUser } from "./IUser";
import bcrypt from "bcrypt";

type IUserConstructorParams = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export class User implements IUser {
    idUser: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;

    constructor(params: IUserConstructorParams) {
        this.idUser = Date.now().toString();
        this.firstName = params.firstName;
        this.lastName = params.lastName;
        this.username = params.username;
        this.password = params.password;
    }

    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    comparePassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
}
