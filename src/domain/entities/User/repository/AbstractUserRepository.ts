import { IUser } from "../IUser";
import { User } from "../User";
export abstract class AbstractUserRepository {
    abstract saveUser(user: IUser): Promise<IUser>;
    abstract updateUser(user: IUser): Promise<IUser>;
    abstract deleteUser(user: IUser): Promise<IUser>;
    abstract getAllUsers(): Promise<IUser[]>;
    abstract getUserByUsername(username: string): Promise<IUser | null>;
    abstract getUserById(id: string): Promise<User | null>;
}
