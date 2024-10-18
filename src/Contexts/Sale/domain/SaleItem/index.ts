import { SaleItemAmount } from './SaleItemAmount'
import { SaleDataPrimitives, SaleItemData } from './SaleItemData'

export type SaleItemPrimitives = ReturnType<SaleItem['toPrimitives']>

export class SaleItem {
  readonly data
  readonly amount

  constructor(params: { data: SaleItemData, amount: SaleItemAmount }) {
    this.data = params.data
    this.amount = params.amount
  }

  calcTotal() {
    const amount = this.amount.value
    const { wholesalePrice, unitaryPrice } = this.data.price
    // TODO item must be have a minimum to wholesalePrice
    if (amount >= 6) return amount * wholesalePrice.value
    return amount * unitaryPrice.value
  }

  static fromPrimitives(primitives: {
    data: SaleDataPrimitives
    amount: number
  }) {
    return new SaleItem({
      data: SaleItemData.fromPrimitives(primitives.data),
      amount: new SaleItemAmount(primitives.amount)
    })
  }

  toPrimitives() {
    return {
      data: this.data.toPrimitives(),
      amount: this.amount.value
    }
  }
}
