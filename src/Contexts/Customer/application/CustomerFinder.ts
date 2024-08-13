import { CustomerRepository } from '../domain/CustomerRepository'

export class CustomerFinder {
  private readonly repository
  constructor(dependencies: { customerRepository: CustomerRepository }) {
    this.repository = dependencies.customerRepository
  }

  async run() {
    return await this.repository.searchAll()
  }
}
