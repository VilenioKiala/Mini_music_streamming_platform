import { IUser } from "../../IUser";
import { AbstractUserRepository } from "../";
import { User } from "../../User";

export class InMemoryUserRepository extends AbstractUserRepository {
    users: User[];

    constructor() {
        super();
        this.users = [];
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.users;
    }

    async saveUser(user: User): Promise<IUser> {
        this.users.push(user);

        return user;
    }
    async updateUser(userToUpdate: User): Promise<User> {
        this.users = this.users.map(user =>
            user.idUser === userToUpdate.idUser ? userToUpdate : user
        );

        return userToUpdate;
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
    async getUserById(id: string): Promise<User | null> {
        return this.users.filter(user => user.idUser === id)?.[0] || null;
    }

    async clear() {
        this.users = [];
    }
}
