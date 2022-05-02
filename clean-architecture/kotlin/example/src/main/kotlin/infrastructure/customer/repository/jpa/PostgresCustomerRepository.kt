package infrastructure.customer.repository.jpa

import domain.customer.ICustomerRepository
import domain.customer.entity.Customer
import domain.shared.Pagination
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.domain.Sort.Direction
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Repository

@Repository
class PostgresCustomerRepository (private val repository: CustomerRepositoryJpa): ICustomerRepository {

    override fun findAll(input: ICustomerRepository.FindAllInput): Pagination<Customer> {
        var where: Specification<CustomerModel> = Specification.where(null)
        val page: PageRequest = PageRequest.of(
            input.page,
            input.perPage,
            Sort.by(Direction.fromString(input.direction), input.sort)
        )
        val queryResult = repository.findAll(where, page)

        return Pagination.Builder<Customer>()
            .currentPage(queryResult.number)
            .perPage(queryResult.size)
            .total(queryResult.totalElements)
            .items(queryResult.map { it.run { it.toEntity() } }.toList())
            .build()
    }
}