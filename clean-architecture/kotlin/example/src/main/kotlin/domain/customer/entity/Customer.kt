package domain.customer.entity

import domain.customer.factory.CustomerValidatorFactory
import domain.customer.valueObject.Address
import domain.shared.entity.Entity
import domain.shared.notification.NotificationError

class Customer(
    override val _id: String = "",
    private var _name: String = "",
    private var _address: Address? = null,
    private var _active: Boolean = false,
    private var _rewardPoints: Int = 0
) : Entity(_id) {
    init {
        validate()
    }

    val name get() = _name
    val rewardPoints get() = _rewardPoints
    val isActive get() = _active

    fun changeName(name: String) {
        this._name = name
        validate()
    }

    fun changeAddress(address: Address) {
        _address = address
    }

    fun activate() {
        if (_address == null) throw Error("Address is mandatory to activate a customer")
        this._active = true
    }

    val address get() = _address

    private fun validate() {
        CustomerValidatorFactory.create().validate(this)
        if (this.notification.hasErrors()) {
            throw NotificationError(this.notification.getErrors())
        }
    }

    fun deactivate() {
        _active = false
    }

    fun addRewardPoints(points: Int) {
        _rewardPoints += points
    }
}
