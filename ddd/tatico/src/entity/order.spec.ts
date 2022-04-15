import Order from './order';
import OrderItem from './order_item';


describe("Order unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", [])
    }).toThrowError("Id is required")
  })
  it("Should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", [])
    }).toThrowError("CustomerId is required")
  })
  it("Should throw error when items is empty", () => {
    expect(() => {
      new Order("123", "123", [])
    }).toThrowError("Items are required")
  })
  it("Should calculate total", () => {
    const item1 = new OrderItem("i1", "Item 1", 100)
    const item2 = new OrderItem("i2", "Item 2", 200)
    const order = new Order("01", "c1", [item1])
    const order2 = new Order("01", "c1", [item1, item2])
    expect(order.total()).toBe(100)
    expect(order2.total()).toBe(300)
  })
})
