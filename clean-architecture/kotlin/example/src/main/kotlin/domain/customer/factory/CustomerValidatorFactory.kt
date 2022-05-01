package domain.customer.factory

import domain.customer.validator.CustomerValiktorValidator

class CustomerValidatorFactory {
    companion object {
        fun create() = CustomerValiktorValidator()
    }
}
