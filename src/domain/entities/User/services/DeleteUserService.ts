import { IUser } from "../IUser";
import { AbstractUserRepository } from "../repository";
import { DeleteAnExistingUserUsecase } from "../usecases";
import {
    AlreadyExistAnUserWithTheSameUsernameError,
    UserDoesNotExistError,
} from "../errors";

export class DeleteUserService extends DeleteAnExistingUserUsecase {
    constructor(private userRepository: AbstractUserRepository) {
        super();
    }

    async delete({
        id,
    }: DeleteAnExistingUserUsecase.Params): DeleteAnExistingUserUsecase.Result {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new UserDoesNotExistError();
        }

        const userDeleted = await this.userRepository.deleteUser(user);

        return userDeleted;
    }
}
