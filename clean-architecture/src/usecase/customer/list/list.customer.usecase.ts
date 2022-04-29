import CustomerInterfaceRepository from "../../../domain/customer/repository/customer-interface-repository";
import { OutputListCustomerDto } from "./list.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class ListCustomerUseCase {
  constructor(private readonly customerRepository: CustomerInterfaceRepository) {

  }

  async execute(): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toOutput(customers)
  }

}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => {
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
      })
    }
  }
}