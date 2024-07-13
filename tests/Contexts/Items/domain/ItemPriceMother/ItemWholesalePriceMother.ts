import { ItemWholeSalePrice } from '../../../../../src/Contexts/Items/domain/ItemPrice/ItemWholesalePrice'
import { IntegerMother } from '../../../Shared/domain/IntegerMother'

export class ItemWholesalePriceMother {
  static create(value: number) {
    return new ItemWholeSalePrice(value)
  }

  static random() {
    return this.create(IntegerMother.random(1000000))
  }
}
