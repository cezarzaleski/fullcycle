package infrastructure.customer.repository.jpa

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.domain.Specification
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CustomerRepositoryJpa:JpaRepository<CustomerModel, UUID> {
    fun findAll(spec: Specification<CustomerModel>, pageable: PageRequest): Page<CustomerModel>

}