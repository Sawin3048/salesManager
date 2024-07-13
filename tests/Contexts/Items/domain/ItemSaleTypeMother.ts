import { ItemSaleType, ItemSaleTypePosiblesValues } from '../../../../src/Contexts/Items/domain/ItemSaleType'
import { IntegerMother } from '../../Shared/domain/IntegerMother'

export class ItemSaleTypeMother {
  static create(value: ItemSaleTypePosiblesValues) {
    return new ItemSaleType(value)
  }

  static random() {
    const values = Object.values(ItemSaleType.posibleValues)
    const randomNumber = IntegerMother.random(values.length - 1)
    const value = values[randomNumber]
    return this.create(value)
  }
}
