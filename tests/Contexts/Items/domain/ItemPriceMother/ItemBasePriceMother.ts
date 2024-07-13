import { ItemBasePrice } from '../../../../../src/Contexts/Items/domain/ItemPrice/ItemBasePrice'
import { IntegerMother } from '../../../Shared/domain/IntegerMother'

export class ItemBasePriceMother {
  static create(value: number) {
    return new ItemBasePrice(value)
  }

  static random() {
    return this.create(IntegerMother.random(1000000))
  }
}
