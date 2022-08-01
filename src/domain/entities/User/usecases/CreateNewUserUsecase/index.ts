import { IUser } from "../../IUser";

export abstract class CreateUserUseCase {
    abstract create(params: CreateUserUseCase.Params): CreateUserUseCase.Result;
}

export namespace CreateUserUseCase {
    export type Params = {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
    };
    export type Result = Promise<IUser>;
}
