import { UserName } from '../../../../src/Contexts/User/domain/UserName'
import { WordMother } from '../../Shared/domain/WordMother'

export class UserNameMother {
  static create(value: string) {
    return new UserName(value)
  }

  static random() {
    return this.create(WordMother.random({ maxLength: 30, minLength: 1 }))
  }
}
