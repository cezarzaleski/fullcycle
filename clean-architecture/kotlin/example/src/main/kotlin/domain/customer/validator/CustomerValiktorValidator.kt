package domain.customer.validator

import domain.customer.entity.Customer
import domain.shared.notification.NotificationErrorProps
import domain.shared.validator.IValidator
import org.valiktor.ConstraintViolationException
import org.valiktor.functions.isNotEmpty

class CustomerValiktorValidator : IValidator<Customer> {
    override fun validate(entity: Customer) {
        try {
            org.valiktor.validate(entity) {
                validate(Customer::id).isNotEmpty()
                validate(Customer::name).isNotEmpty()
            }
        } catch (ex: ConstraintViolationException) {
            ex.constraintViolations
                .forEach {
                    entity.notification.addError(
                        NotificationErrorProps(
                            "customer",
                            "${it.property} ${it.constraint.name}"
                        )
                    )
                }
        }
    }
}
