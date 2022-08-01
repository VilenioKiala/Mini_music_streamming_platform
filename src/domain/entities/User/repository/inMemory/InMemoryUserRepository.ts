import { IUser } from "../../IUser";
import { AbstractUserRepository } from "../";

export class InMemoryUserRepository extends AbstractUserRepository {
    users: IUser[];

    constructor() {
        super();
        this.users = [];
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.users;
    }

    async saveUser(user: IUser): Promise<IUser> {
        this.users.push(user);

        return user;
    }
    async deleteUser(user: IUser): Promise<IUser> {
        this.users = this.users.filter(userFilter => userFilter != user);

        return user;
    }

    async getUserByUsername(username: string): Promise<IUser | null> {
        return (
            this.users.filter(user => user.username === username)?.[0] || null
        );
    }
    async getUserById(id: string): Promise<IUser | null> {
        return this.users.filter(user => user.id === id)?.[0] || null;
    }
}
