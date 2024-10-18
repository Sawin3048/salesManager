import { ItemCode } from './ItemCode'
import { ItemDescription } from './ItemDescription'
import { ItemSaleType } from './ItemSaleType'
import { ItemStock } from './ItemStock'
import { ItemPrice } from './ItemPrice'
import { ItemId } from './ItemId'

export class Item {
  constructor(
    readonly id: ItemId,
    readonly code: ItemCode,
    readonly description: ItemDescription,
    readonly saleType: ItemSaleType,
    readonly price: ItemPrice,
    readonly stock: ItemStock
  ) { }

  static fromPrimitives(plainData: {
    id: string
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
      new ItemId(plainData.id),
      new ItemCode(plainData.code),
      new ItemDescription(plainData.description),
      new ItemSaleType(plainData.saleType),
      ItemPrice.fromPrimitives(plainData.price),
      new ItemStock(plainData.stock)
    )
  }

  toPrimitives() {
    return {
      id: this.id.value,
      code: this.code.value,
      description: this.description.value,
      saleType: this.saleType.value,
      stock: this.stock.value,
      price: {
        basePrice: this.price.basePrice.value,
        unitaryPrice: this.price.unitaryPrice.value,
        wholesalePrice: this.price.wholesalePrice.value
      }
    }
  }
}
