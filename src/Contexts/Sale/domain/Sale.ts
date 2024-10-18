import { SaleCreatedAt } from './SaleCreatedAt'
import { SaleId } from './SaleId'
import { SaleItemPrimitives, SaleItem } from './SaleItem/index'

export type SalePrimitives = ReturnType<Sale['toPrimitives']>

export class Sale {
  readonly id
  readonly createdAt
  readonly items
  readonly total

  constructor(params: { id: SaleId, createdAt: SaleCreatedAt, items: SaleItem[] }) {
    this.id = params.id
    this.createdAt = params.createdAt
    this.items = params.items
    this.total = this.calcTotal()
  }

  private calcTotal() {
    return this.items.reduce((total, item) => total + item.calcTotal(), 0)
  }

  static fromPrimivitives(params: {
    id: string
    createdAt: string | Date
    items: SaleItemPrimitives[]
  }) {
    return new Sale({
      id: new SaleId(params.id),
      createdAt: new SaleCreatedAt(params.createdAt),
      items: params.items.map(i => SaleItem.fromPrimitives(i))
    })
  }

  toPrimitives() {
    return {
      id: this.id.value,
      createdAt: this.createdAt.value.toISOString(),
      items: this.items.map(item => item.toPrimitives())
    }
  }
}
