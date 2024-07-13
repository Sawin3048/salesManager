import { ItemUnitaryPrice } from '../../../../../src/Contexts/Items/domain/ItemPrice/ItemUnitaryPrice'
import { IntegerMother } from '../../../Shared/domain/IntegerMother'

export class ItemUnitarySaleMother {
  static create(value: number) {
    return new ItemUnitaryPrice(value)
  }

  static random() {
    return this.create(IntegerMother.random(1000000))
  }
}
