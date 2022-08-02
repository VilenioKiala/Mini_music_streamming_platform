import { AbstractValidator } from "../../../../helpers/validators";
import { UserDoesNotExistError } from "../errors";
import { IUser } from "../IUser";
import { AbstractUserRepository } from "../repository";
import { UpdateAnExistingUserUsecase } from "../usecases";

export class UpdateUserService extends UpdateAnExistingUserUsecase {
    constructor(
        private validator: AbstractValidator<IUser>,
        private userRepository: AbstractUserRepository
    ) {
        super();
    }

    async update({
        id,
        data,
    }: UpdateAnExistingUserUsecase.Params): Promise<IUser> {
        const { firstName, lastName, password, username } = data;
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new UserDoesNotExistError();
        }

        Object.assign(user, {
            firstName: firstName ?? user.firstName,
            lastName: lastName ?? user.lastName,
            username: username ?? user.username,
            password: password ?? user.password,
        });
        this.validator.validate(user);

        if (password) {
            user.encryptPassword();
        }

        const userUpdated = await this.userRepository.updateUser(user);

        return userUpdated;
    }
}
