import { ItemCode } from '../../../../src/Contexts/Items/domain/ItemCode'
import { ItemDescription } from '../../../../src/Contexts/Items/domain/ItemDescription'
import { ItemSaleType } from '../../../../src/Contexts/Items/domain/ItemSaleType'
import { ItemPrice } from '../../../../src/Contexts/Items/domain/ItemPrice'
import { ItemStock } from '../../../../src/Contexts/Items/domain/ItemStock'
import { Item } from '../../../../src/Contexts/Items/domain/Item'
import { ItemCodeMother } from './ItemCodeMother'
import { ItemDescriptionMother } from './ItemDescriptionMother'
import { ItemSaleTypeMother } from './ItemSaleTypeMother'
import { ItemPriceMother } from './ItemPriceMother'
import { ItemStockMother } from './ItemStockMother'

export class ItemMother {
  static create(
    code: ItemCode,
    description: ItemDescription,
    saleType: ItemSaleType,
    price: ItemPrice,
    stock: ItemStock
  ) {
    return new Item(code, description, saleType, price, stock)
  }

  static random() {
    return this.create(
      ItemCodeMother.random(),
      ItemDescriptionMother.random(),
      ItemSaleTypeMother.random(),
      ItemPriceMother.random(),
      ItemStockMother.random()
    )
  }
}
