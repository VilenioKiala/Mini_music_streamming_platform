import { IUser } from "../IUser";
export abstract class AbstractUserRepository {
    abstract saveUser(user: IUser): Promise<IUser>;
    abstract deleteUser(user: IUser): Promise<IUser>;
    abstract getAllUsers(): Promise<IUser[]>;
    abstract getUserByUsername(username: string): Promise<IUser | null>;
    abstract getUserById(id: string): Promise<IUser | null>;
}
