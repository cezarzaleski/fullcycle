import Order from "../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderInterfaceRepository from "../../../domain/checkout/repository/order-interface-repository";
import OrderItemModel from "./order-item.model";
import OrderItem from "../../../domain/checkout/entity/order_item";


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
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: {order_id: entity.id},
        transaction: t,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, {transaction: t});
      await OrderModel.update(
        {total: entity.total()},
        {where: {id: entity.id}, transaction: t}
      );
    });
  }
}