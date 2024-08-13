import { CustomerRUC } from '../domain/CustomerCin'
import { CustomerRepository } from '../domain/CustomerRepository'

export class CustomerFinderByRuc {
  private readonly repository
  constructor(dependencies: { customerRepository: CustomerRepository }) {
    this.repository = dependencies.customerRepository
  }

  async run(ruc: string) {
    const customerRuc = new CustomerRUC(ruc)
    await this.repository.search(customerRuc)
  }
}
