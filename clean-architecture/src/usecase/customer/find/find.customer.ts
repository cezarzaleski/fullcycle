import CustomerInterfaceRepository from "../../../domain/customer/repository/customer-interface-repository";
import  { InputFindCustomerDto, OutputFindCustomerDto } from "./find.dto";

export default class FindCustomerUseCase {
  constructor(private readonly customerRepository: CustomerInterfaceRepository) {

  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
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