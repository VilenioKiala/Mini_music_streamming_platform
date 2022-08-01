import { IUser } from "../../IUser";

export abstract class UpdateAnExistingUserUsecase {
    abstract update(
        params: UpdateAnExistingUserUsecase.Params
    ): UpdateAnExistingUserUsecase.Result;
}

export namespace UpdateAnExistingUserUsecase {
    export type Params = {
        id: string;
        data: {
            firstName?: string;
            lastName?: string;
            username?: string;
            password?: string;
        };
    };

    export type Result = Promise<IUser>;
}
