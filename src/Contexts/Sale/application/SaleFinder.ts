import { SaleRepository } from '../domain/SaleRepository'

export class SalesFinder {
  readonly saleRepository
  constructor(dependencies: {
    saleRepository: SaleRepository
  }) {
    this.saleRepository = dependencies.saleRepository
  }

  async run() {
    return (await this.saleRepository.searchAll()).map(s => s.toPrimitives())
  }
}
