import { UserCin } from '../../../../src/Contexts/User/domain/UserCin'
import { IntegerMother } from '../../Shared/domain/IntegerMother'

export class UserCinMother {
  static create(value: number) {
    return new UserCin(value)
  }

  static random() {
    return this.create(IntegerMother.random(99999999, 99))
  }
}
