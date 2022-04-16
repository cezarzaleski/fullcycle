import OrderInterfaceRepository from "../../domain/repository/order-interface-repository";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

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
    return Promise.resolve(undefined)
  }

  async findAll(): Promise<Order[]> {
    return Promise.resolve(undefined)
  }

  async update(entity: Order): Promise<void> {
  }
}
