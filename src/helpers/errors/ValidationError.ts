type ValidationErrorType = {
    message: string;
    field: string;
};

export class ValidationError extends Error {
    field?: string;

    constructor(params: ValidationErrorType) {
        super(params.message);

        this.name = "VALIDATION_ERROR";

        this.field = params.field;
    }
}
