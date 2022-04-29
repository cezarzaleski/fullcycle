import { InputCreateCustomerDto } from "./create.dto";
import CreateCustomerUseCase from "./create.customer.usecase";

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

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)
    const input: InputCreateCustomerDto = {
      name: '',
      address: {
        street: "Street 1",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    }
    await expect((useCase.execute(input))).rejects.toThrow("Name is required")
  })

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)
    const input: InputCreateCustomerDto = {
      name: 'name',
      address: {
        street: "",
        city: "City 1",
        number: 1,
        zip: "Zipcode 1"
      }
    }
    await expect((useCase.execute(input))).rejects.toThrow("Street is required")
  })
})