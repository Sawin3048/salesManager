import { ItemDescription } from '../../../../src/Contexts/Items/domain/ItemDescription'
import { WordMother } from '../../Shared/domain/WordMother'

export class ItemDescriptionMother {
  static create(value: string) {
    return new ItemDescription(value)
  }

  static random() {
    return this.create(WordMother.random({ maxLength: 40 }))
  }
}
