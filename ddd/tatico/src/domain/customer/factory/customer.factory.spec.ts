import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe("Customer factory unit teste", () => {
  it("should create a new customer", () => {
    const customer = CustomerFactory.create("John")

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("John")
    expect(customer.Address).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const address = new Address(1, "Street 1", "City 1", "Zipcode 1");
    const customer = CustomerFactory.createWithAddress("John", address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("John")
    expect(customer.Address).toBe(address)

  });
})
