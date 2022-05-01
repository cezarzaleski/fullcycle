import CustomerInterfaceRepository from "../../../domain/customer/repository/customer-interface-repository";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.dto";

export default class UpdateCustomerUsecase {
  constructor(private readonly customerRepository: CustomerInterfaceRepository) {
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const {street, city, number, zip} = input.address
    const customer = await this.customerRepository.find(input.id)
    const address = new Address(number, street, city, zip);
    customer.changeAddress(address)
    customer.changeName(input.name)
    await this.customerRepository.update(customer)
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