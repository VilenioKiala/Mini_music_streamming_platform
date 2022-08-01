export class AlreadyExistAnUserWithTheSameUsernameError extends Error {
    field?: string;
    constructor() {
        super(
            "Já existe um usuário com este nome de usuário, por favor, use outro nome de usuário."
        );

        this.field = "username";
    }
}
