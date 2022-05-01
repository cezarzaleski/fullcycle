package domain.customer.entity

import domain.customer.valueObject.Address
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class CustomerTest {

    @Test
    fun `should throw error when id is empty`() {
        val actualException = Assertions.assertThrows(Error::class.java) {
            Customer("", "John", null).address
        }
        Assertions.assertEquals("customer: id NotEmpty", actualException.message)
    }

    @Test
    fun `should throw error when name is empty`() {
        val actualException = Assertions.assertThrows(Error::class.java) {
            Customer("123", "", null)
        }
        Assertions.assertEquals("customer: name NotEmpty", actualException.message)
    }

    @Test
    fun `should throw error when name is and id are empty`() {
        val actualException = Assertions.assertThrows(Error::class.java) {
            Customer("", "", null)
        }
        Assertions.assertEquals("customer: id NotEmpty,customer: name NotEmpty", actualException.message)
    }

    @Test
    fun `should change name`() {
        val customer = Customer("123", "John", null)

        customer.changeName("Jane")

        Assertions.assertEquals("Jane", customer.name)
    }

    @Test
    fun `should activate customer`() {
        val customer = Customer("123", "John", null)
        val address = Address.from("Street 1", 123, "13330-250", "São Paulo")
        customer.changeAddress(address)

        customer.activate()

        Assertions.assertEquals(true, customer.isActive)
    }
}
