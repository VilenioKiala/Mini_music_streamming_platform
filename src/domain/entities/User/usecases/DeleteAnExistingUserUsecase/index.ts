import { IUser } from "../../IUser";

export abstract class DeleteAnExistingUserUsecase {
    abstract delete(
        params: DeleteAnExistingUserUsecase.Params
    ): DeleteAnExistingUserUsecase.Result;
}

export namespace DeleteAnExistingUserUsecase {
    export type Params = {
        id: string;
    };
    export type Result = Promise<IUser>;
}
