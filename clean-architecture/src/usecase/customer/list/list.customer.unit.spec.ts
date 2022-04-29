import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = new Customer("1", "Customer 1");
const address1 = new Address(1, "Street 1", "City 1", "Zipcode 1");
customer1.Address = address1

const customer2 = new Customer("2", "Customer 2");
const address2 = new Address(2, "Street 2", "City 2", "Zipcode 2");
customer2.Address = address2

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test for list customer use case", () => {
  it('should list a customer', async ()=> {
    const customerRepository = MockRepository()
    const useCase = new ListCustomerUseCase(customerRepository)


    const result = await useCase.execute()
    expect(result.customers.length).toBe(2)
    expect(result.customers[0].id).toBe(customer1.id)
    expect(result.customers[1].id).toBe(customer2.id)

  });
})