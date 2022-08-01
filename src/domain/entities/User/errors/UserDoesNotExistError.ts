export class UserDoesNotExistError extends Error {
    constructor() {
        super("Usuário não encontrado!");
    }
}
