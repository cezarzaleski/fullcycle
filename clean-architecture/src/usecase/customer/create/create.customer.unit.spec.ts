import { InputCreateCustomerDto } from "./create.dto";
import CreateCustomerUseCase from "./create.customer";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit teste create customer use case", () => {
  it('should create a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const input: InputCreateCustomerDto = {
      name: 'Customer 1',
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    }
    const result = await useCase.execute(input)
    expect(result).toEqual({
      id: expect.any(String),
      name: 'Customer 1',
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    })
  });
})