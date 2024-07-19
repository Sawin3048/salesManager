import { UserPassword } from '../../../../src/Contexts/User/domain/UserPassword'
import { WordMother } from '../../Shared/domain/WordMother'

export class UserPasswordMother {
  static create(value: string) {
    return new UserPassword(value)
  }

  static random() {
    const password = WordMother.random({ maxLength: 60, minLength: 9 })
    console.log({ password })
    return this.create(password)
  }
}
