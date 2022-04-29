import CustomerInterfaceRepository from "../../../domain/customer/repository/customer-interface-repository";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

export default class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerInterfaceRepository) {

  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const {street, city, number, zip} = input.address
    const address = new Address(number, street, city, zip);
    const customer = CustomerFactory.createWithAddress(input.name, address)
    await this.customerRepository.create(customer)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip
      }
    }

  }

}