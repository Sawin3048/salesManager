import { ItemPrice } from '../../../../../src/Contexts/Items/domain/ItemPrice'
import { ItemBasePrice } from '../../../../../src/Contexts/Items/domain/ItemPrice/ItemBasePrice'
import { ItemUnitaryPrice } from '../../../../../src/Contexts/Items/domain/ItemPrice/ItemUnitaryPrice'
import { ItemWholeSalePrice } from '../../../../../src/Contexts/Items/domain/ItemPrice/ItemWholesalePrice'
import { ItemBasePriceMother } from './ItemBasePriceMother'
import { ItemUnitarySaleMother } from './ItemUnitarySaleMother'
import { ItemWholesalePriceMother } from './ItemWholesalePriceMother'

export class ItemPriceMother {
  static create(
    basePrice: ItemBasePrice,
    unitaryPrice: ItemUnitaryPrice,
    wholesalePrice: ItemWholeSalePrice) {
    return new ItemPrice(basePrice, unitaryPrice, wholesalePrice)
  }

  static random() {
    return this.create(
      ItemBasePriceMother.random(),
      ItemUnitarySaleMother.random(),
      ItemWholesalePriceMother.random()
    )
  }
}
