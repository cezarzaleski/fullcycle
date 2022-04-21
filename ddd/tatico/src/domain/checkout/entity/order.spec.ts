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
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2)
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2)
    const order = new Order("01", "c1", [item1])
    const order2 = new Order("01", "c1", [item1, item2])
    expect(order.total()).toBe(200)
    expect(order2.total()).toBe(600)
  })

  it("Should throw error if the item qte is greater less or equal zero", () => {
    expect(() => {
      const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0)
      new Order("01", "c1", [item1])
    }).toThrowError("Quantity must be greater than 0")
  })
})
