import { Customer } from '../domain/Customer'
import { CustomerRepository } from '../domain/CustomerRepository'

export class CustomerCreator {
  private readonly repository
  constructor(dependencies: { customerRepository: CustomerRepository }) {
    this.repository = dependencies.customerRepository
  }

  async run(params: {
    name: string
    lastname: string
    ruc: string
  }) {
    const customer = Customer.fromPrimitives(params)
    return await this.repository.save(customer)
  }
}
