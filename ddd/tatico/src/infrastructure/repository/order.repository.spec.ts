import {Sequelize} from 'sequelize-typescript';
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "../repository/customer.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "../repository/product.repository";
import CustomerInterfaceRepository from "../../domain/customer/repository/customer-interface-repository";
import OrderInterfaceRepository from "../../domain/checkout/repository/order-interface-repository";
import ProductInterfaceRepository from "../../domain/product/repository/product-interface-repository";
import Order from "../../domain/checkout/entity/order";
import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import OrderRepository from "./order.repository";
import OrderItem from "../../domain/checkout/entity/order_item";
import Product from "../../domain/product/entity/product";

describe("Order repository test", () => {
  let sequelize: Sequelize;
  let customerRepository: CustomerInterfaceRepository;
  let productRepository: ProductInterfaceRepository;
  let subject: OrderInterfaceRepository;
  let customer: Customer;
  let product: Product;

  beforeEach(async () => {
    customerRepository = new CustomerRepository();
    productRepository = new ProductRepository();
    subject = new OrderRepository();
    customer = new Customer("123", "Customer 1");
    customer.Address = new Address(1, "Street 1", "City 1", "Zipcode 1");
    product = new Product("p1", "Product 1", 10)
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true},
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2)
    const order = new Order("1", customer.id, [orderItem])
    await productRepository.create(product);
    await customerRepository.create(customer);
    await subject.create(order)

    const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["items"]});
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          quantity: orderItem.quantity,
          price: orderItem.price,
          order_id: order.id,
          product_id: product.id,
        }
      ],
    });
  });

  it('should find a order', async () => {
    const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2)
    const order = new Order("1", customer.id, [orderItem])
    await productRepository.create(product);
    await customerRepository.create(customer);
    await subject.create(order)

    const orderResult = await subject.find(order.id);

    expect(order).toStrictEqual(orderResult);
  });

  it('should find all orders', async () => {
    customer.Address = new Address(1, "Street 1", "City 1", "Zipcode 1");
    const orderItem1 = new OrderItem("i1", product.name, product.price, product.id, 2)
    const order1 = new Order("1", customer.id, [orderItem1])
    await productRepository.create(product);
    await customerRepository.create(customer);
    await subject.create(order1)
    const orderItem2 = new OrderItem("i2", product.name, product.price, product.id, 2)
    const order2 = new Order("2", customer.id, [orderItem2])
    await subject.create(order2)

    const orders = await subject.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });

  it('should update a order', async () => {
    const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2)
    const orderItemUpdate = new OrderItem("i2", product.name, product.price, product.id, 4)
    const order = new Order("1", customer.id, [orderItem])
    await productRepository.create(product);
    await customerRepository.create(customer);
    await subject.create(order)
    const orderUpdate = new Order("1", customer.id, [orderItemUpdate])

    await subject.update(orderUpdate)

    const orderResult = await subject.find(order.id);

    expect(orderUpdate).toStrictEqual(orderResult);
  });
})
