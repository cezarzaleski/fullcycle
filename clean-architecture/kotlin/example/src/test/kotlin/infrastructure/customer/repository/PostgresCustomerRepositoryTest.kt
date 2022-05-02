package infrastructure.customer.repository

import domain.customer.ICustomerRepository
import domain.customer.entity.Customer
import domain.customer.valueObject.Address
import infrastructure.customer.repository.jpa.CustomerModel
import infrastructure.customer.repository.jpa.CustomerRepositoryJpa
import infrastructure.customer.repository.jpa.PostgresCustomerRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles


@DataJpaTest
@Import(PostgresCustomerRepository::class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@ActiveProfiles("test")
@SpringBootTest
internal class PostgresCustomerRepositoryTest(
    val postgresCustomerRepository: PostgresCustomerRepository,
    val customerRepositoryJpa: CustomerRepositoryJpa
) {

    @BeforeEach
    fun beforeEach() {
        customerRepositoryJpa.deleteAll()
        customerRepositoryJpa.flush()
    }

    @Test
    fun `find all Customers`() {
        val expectedItemSize = 2
        val expectedPage = 0
        val expectedPerPage = 15
        val expectedElementsCount = 2
        val address = Address.from("Street 1", 123, "13330-250", "São Paulo")

        val customerOne = Customer("123", "John", address)
        val customerTwo = Customer("123", "John", address)

        customerRepositoryJpa.save(CustomerModel.from(customerOne))
        customerRepositoryJpa.save(CustomerModel.from(customerTwo))

        assertThat(customerRepositoryJpa.count()).isEqualTo(2)

        val findAllInput = ICustomerRepository.FindAllInput(
            "",
            expectedPage,
            expectedPerPage,
            "name",
            "asc"
        )

        val actual = postgresCustomerRepository.findAll(findAllInput)

        assertThat(actual).isNotNull
        assertThat(actual.items).hasSize(expectedItemSize);
        assertThat(actual.currentPage).isEqualTo(expectedPage);
        assertThat(actual.perPage).isEqualTo(expectedPerPage);
        assertThat(actual.total).isEqualTo(expectedElementsCount);
    }
}