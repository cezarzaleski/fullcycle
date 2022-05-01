package domain.shared.validator

interface IValidator<T> {
    fun validate(entity: T)
}
