import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import { OutputFindCustomerDto } from "./find.dto";
import FindCustomerUseCase from "./find.customer";

const customer = new Customer("123", "Customer 1");
const address = new Address(1, "Street 1", "City 1", "Zipcode 1", );
customer.Address = address

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Test create customer use case unit", () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123'
    }
    const output: OutputFindCustomerDto = {
      id: '123',
      name: 'Customer 1',
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }

    }
    const result = await useCase.execute(input)
    expect(result).toEqual(output)
  });

  it('should not find a customer', async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found")
    })
    const useCase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: '123'
    }
    expect(() => {
      return useCase.execute(input)
    }).rejects.toThrow("Customer not found")
  });
})