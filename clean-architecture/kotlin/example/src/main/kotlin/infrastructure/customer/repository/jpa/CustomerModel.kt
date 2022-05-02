package infrastructure.customer.repository.jpa

import domain.customer.entity.Customer
import java.util.*
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull


@Entity
@Table(name = "categories")
class CustomerModel {

    @Id
    var id: UUID? = null

    @NotEmpty(message = "name can not be empty")
    var name: String? = null

    @NotEmpty(message = "street can not be empty")
    var street: String? = null

    @Column
    @NotNull(message = "number can not be null")
    var number: Int? = null

    @NotEmpty(message = "zipcode can not be empty")
    var zipcode: String? = null

    @NotEmpty(message = "city can not be empty")
    var city: String? = null

    @Column
    @NotNull(message = "active can not be null")
    var active: Boolean? = null

    @Column(name = "reward_points")
    @NotNull(message = "rewardPoints can not be null")
    var rewardPoints: Int? = null

    fun toEntity(): Customer = Customer(id.toString(), name!!, null, active!!, rewardPoints!!)

    companion object {
        fun from(customer: Customer): CustomerModel {
            val customerModel = CustomerModel()
            customerModel.apply {
                id = UUID.fromString(customer.id)
                name = customer.name
                street = customer.address?.street
                number = customer.address?.number
                zipcode = customer.address?.zip
                city = customer.address?.city
                active = customer.isActive
                rewardPoints = customer.rewardPoints
            }
            return customerModel
        }
    }

}