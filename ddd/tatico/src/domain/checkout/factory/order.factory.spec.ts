import OrderFactory from "./order.factory";
import {v4 as uuid} from "uuid"

describe("Order factory unit teste", () => {
  it('should create an order', () => {
    const orderProps = {
      id: uuid().toString(),
      customerId: uuid().toString(),
      items: [
        {
          id: uuid().toString(),
          name: "Product1",
          quantity: 1,
          price: 100
        }
      ]
    }
    const order = OrderFactory.create(orderProps)
    expect(order.id).toEqual(orderProps.id)
    expect(order.customerId).toEqual(orderProps.customerId)
    expect(order.items.length).toBe(1)
  });
})
