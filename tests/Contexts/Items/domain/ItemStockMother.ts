import { ItemStock } from '../../../../src/Contexts/Items/domain/ItemStock'
import { IntegerMother } from '../../Shared/domain/IntegerMother'

export class ItemStockMother {
  static create(value: number) {
    return new ItemStock(value)
  }

  static random() {
    return this.create(IntegerMother.random(999))
  }
}
