import Customer from '../../domain/entity/customer';
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerInterfaceRepository from "../../domain/repository/customer-interface-repository";
import Address from "../../domain/entity/address";

export default class CustomerRepository implements CustomerInterfaceRepository {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      city: entity.Address.city,
      zipcode: entity.Address.zip,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
    })
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.number,
      customerModel.street,
      customerModel.city,
      customerModel.zipcode
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    return customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.number,
        customerModels.street,
        customerModels.city,
        customerModels.zipcode
      );
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        city: entity.Address.city,
        zipcode: entity.Address.zip,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }
}
