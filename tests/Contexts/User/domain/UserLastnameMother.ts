import { UserLastname } from '../../../../src/Contexts/User/domain/UserSubname'
import { WordMother } from '../../Shared/domain/WordMother'

export class UserLastnameMother {
  static create(value: string) {
    return new UserLastname(value)
  }

  static random() {
    return this.create(WordMother.random({ maxLength: 30, minLength: 1 }))
  }
}
