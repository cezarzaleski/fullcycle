import OrderInterfaceRepository from "../../domain/repository/order-interface-repository";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderInterfaceRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{model: OrderItemModel}]
    })
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
          where: {
            id,
          },
          rejectOnEmpty: true,
          include: ["items"]
        }
      );
    } catch (error) {
      throw new Error("Order not found");
    }
    const items = orderModel.items
      .map(item => new OrderItem(item.id, item.name, item.price / item.quantity, item.product_id, item.quantity))
    return new Order(orderModel.id, orderModel.customer_id, items)
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({include: ["items"]});
    return ordersModel
      .map(orderModel => {
        const items = orderModel.items
          .map(item => new OrderItem(item.id, item.name, item.price / item.quantity, item.product_id, item.quantity))
        return new Order(orderModel.id, orderModel.customer_id, items)
      })

  }

  async update(entity: Order): Promise<void> {
  }
}
