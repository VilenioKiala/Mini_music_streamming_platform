import { IUser } from "../IUser";
import { AbstractUserRepository } from "../repository";
import { CreateUserUseCase } from "../usecases";
import { User } from "../User";
import { AlreadyExistAnUserWithTheSameUsernameError } from "../errors";
import { AbstractValidator } from "../../../../helpers/validators/AbstractValidator";

export class CreateUserService extends CreateUserUseCase {
    constructor(
        private validator: AbstractValidator<IUser>,
        private userRepository: AbstractUserRepository
    ) {
        super();
    }

    async create(params: CreateUserUseCase.Params): CreateUserUseCase.Result {
        const userToSave = new User({
            ...params,
        });

        this.validator.validate(userToSave);

        const userAlreadySavedWithTheSameUsername =
            await this.userRepository.getUserByUsername(userToSave.username);

        if (userAlreadySavedWithTheSameUsername) {
            throw new AlreadyExistAnUserWithTheSameUsernameError();
        }

        userToSave.encryptPassword();

        const userSaved = await this.userRepository.saveUser(userToSave);

        return userSaved;
    }
}
