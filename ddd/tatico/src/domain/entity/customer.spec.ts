import Customer from './customer';
import Address from './address';

describe("Customer unit teste", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John")
    }).toThrowError("Id is required")
  })
  it("Should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "")
    }).toThrowError("Name is required")
  })
  it("Should change name", () => {
    let customer = new Customer("123", "Name")

    customer.changeName("Jane")

    expect(customer.name).toBe("Jane")
  })
  it("Should activate customer", () => {
    let customer = new Customer("123", "Name")
    customer.changeAddress(new Address(1, "Street 1", "Zipcode 1", "City 1"))

    customer.activate()

    expect(customer.isActive).toBeTruthy()
  })
  it("Should deactivate customer", () => {
    let customer = new Customer("123", "Name")

    customer.deactivate()

    expect(customer.isActive).toBeFalsy()
  })

  it("Should throw when address is undefined when you activate a customer", () => {
    expect(() => {
      let customer = new Customer("123", "Name")
      customer.activate()
    }).toThrowError("")
  })
})
