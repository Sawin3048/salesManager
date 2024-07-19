import { UserRole } from '../../../../src/Contexts/User/domain/UserRole'
import { IntegerMother } from '../../Shared/domain/IntegerMother'

export class UserRoleMother {
  static create(value: string) {
    return new UserRole(value)
  }

  static random() {
    const values = Object.values(UserRole.posibleValues)

    const value = values[IntegerMother.random(values.length - 1, 0)]
    return this.create(value)
  }
}
