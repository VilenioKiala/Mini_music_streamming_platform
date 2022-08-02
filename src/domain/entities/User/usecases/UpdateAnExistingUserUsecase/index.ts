import { IUpdateUser, IUser } from "../../IUser";

export abstract class UpdateAnExistingUserUsecase {
    abstract update(
        params: UpdateAnExistingUserUsecase.Params
    ): UpdateAnExistingUserUsecase.Result;
}

export namespace UpdateAnExistingUserUsecase {
    export type Params = {
        id: string;
        data: IUpdateUser;
    };

    export type Result = Promise<IUser>;
}
