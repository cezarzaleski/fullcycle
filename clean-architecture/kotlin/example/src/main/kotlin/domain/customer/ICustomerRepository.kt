package domain.customer

import domain.customer.entity.Customer
import domain.shared.Pagination

//interface ICustomerRepository:IRepository<Customer>
interface ICustomerRepository {
    fun findAll(input: FindAllInput): Pagination<Customer>

    data class FindAllInput (
        val search: String,
        val page: Int = 0,
        val perPage: Int = 0,
        val sort: String,
        val direction: String
    )

}