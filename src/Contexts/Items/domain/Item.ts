import { ItemCode } from './ItemCode'
import { ItemDescription } from './ItemDescription'
import { ItemSaleType } from './ItemSaleType'
import { ItemStock } from './ItemStock'
import { ItemPrice } from './ItemPrice'

export class Item {
  constructor(
    readonly code: ItemCode,
    readonly description: ItemDescription,
    readonly saleType: ItemSaleType,
    readonly price: ItemPrice,
    readonly stock: ItemStock
  ) { }

  static fromPrimitives(plainData: {
    code: number
    description: string
    saleType: string
    price: {
      basePrice: number
      unitaryPrice: number
      wholesalePrice: number
    }
    stock: number
  }) {
    return new Item(
      new ItemCode(plainData.code),
      new ItemDescription(plainData.description),
      new ItemSaleType(plainData.saleType),
      ItemPrice.fromPrimitives(plainData.price),
      new ItemStock(plainData.stock)
    )
  }

  toPrimitives() {
    return {
      code: this.code.value,
      description: this.description.value,
      saleType: this.saleType.value,
      price: {
        basePrice: this.price.basePrice.value,
        unitaryPrice: this.price.unitaryPrice.value,
        wholesalePrice: this.price.wholesalePrice.value
      },
      stock: this.stock.value
    }
  }
}
