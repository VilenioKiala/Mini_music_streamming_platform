import { IUser } from "../IUser";
import { ValidationError } from "../../../../helpers/errors";
import { AbstractValidator } from "../../../../helpers/validators/AbstractValidator";

export class UserValidator implements AbstractValidator<IUser> {
    validate(user: IUser) {
        if (!user.firstName || user.firstName.length === 0) {
            throw new ValidationError({
                field: "firstName",
                message: "O campo PRIMEIRO NOME é obrigatório!",
            });
        }

        if (!user.lastName || user.lastName.length === 0) {
            throw new ValidationError({
                field: "lastName",
                message: "O campo APELIDO é obrigatório!",
            });
        }

        if (!user.username || user.username.length === 0) {
            throw new ValidationError({
                field: "username",
                message: "O campo NOME DE USUÁRIO é obrigatório!",
            });
        }

        if (!/^\w+$/.test(user.username)) {
            throw new ValidationError({
                field: "username",
                message:
                    "O campo NOME DE USUÁRIO só pode conter letras e números!",
            });
        }

        if (!user.password || user.password.length === 0) {
            throw new ValidationError({
                field: "password",
                message: "O campo SENHA é obrigatório!",
            });
        }
    }
}
