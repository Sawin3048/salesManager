import { ItemCode } from '../../../../src/Contexts/Items/domain/ItemCode'
import { IntegerMother } from '../../Shared/domain/IntegerMother'

export class ItemCodeMother {
  static create(value: number) {
    return new ItemCode(value)
  }

  static random() {
    return this.create(IntegerMother.random(100000000))
  }
}
