import OrderItem from '../entity/order_item';
import Order from '../entity/order';
import OrderService from './order.service';

describe("Order service unit tests", () => {
  it('should ', () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1)
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2)
    const order1 = new Order("01", "c1", [item1])
    const order2 = new Order("02", "c1", [item2])

    const total = OrderService.total([order1, order2])
    expect(total).toBe(500)

  });
})
