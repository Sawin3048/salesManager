import { ItemBasePrice } from './ItemBasePrice'
import { ItemUnitaryPrice } from './ItemUnitaryPrice'
import { ItemWholeSalePrice } from './ItemWholesalePrice'

export class ItemPrice {
  constructor(
    readonly basePrice: ItemBasePrice,
    readonly unitaryPrice: ItemUnitaryPrice,
    readonly wholesalePrice: ItemWholeSalePrice
  ) { }

  static fromPrimitives(
    plainData: {
      basePrice: number
      unitaryPrice: number
      wholesalePrice: number
    }) {
    return new ItemPrice(
      new ItemBasePrice(plainData.basePrice),
      new ItemUnitaryPrice(plainData.unitaryPrice),
      new ItemWholeSalePrice(plainData.wholesalePrice)
    )
  }

  toPrimitives() {
    return {
      basePrice: this.basePrice.value,
      unitaryPrice: this.unitaryPrice.value,
      wholesalePrice: this.wholesalePrice.value
    }
  }
}
