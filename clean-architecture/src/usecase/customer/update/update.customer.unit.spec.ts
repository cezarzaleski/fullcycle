import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "./update.dto";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = new Customer("123", "Customer 1");
const address = new Address(1, "Street 1", "City 1", "Zipcode 1", );
customer.Address = address
const input: InputUpdateCustomerDto = {
  id: customer.id,
  name: 'Customer 1 Updated',
  address: {
    street: "Street 1 Updated",
    city: "City 1 Updated",
    number: 2,
    zip: "Zipcode 1 Updated"
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for customer update use case", () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new UpdateCustomerUsecase(customerRepository)

    const result = await useCase.execute(input)
    expect(result).toEqual({
      id: expect.any(String),
      name: 'Customer 1 Updated',
      address: {
        street: "Street 1 Updated",
        city: "City 1 Updated",
        number: 2,
        zip: "Zipcode 1 Updated"
      }
    })
  })
})