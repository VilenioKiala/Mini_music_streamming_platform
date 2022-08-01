export abstract class AbstractValidator<I> {
    abstract validate(entity: I): void;
}
