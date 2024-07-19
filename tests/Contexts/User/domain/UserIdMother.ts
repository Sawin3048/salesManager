import { UserId } from '../../../../src/Contexts/User/domain/UserId'
import { UuidMother } from '../../Shared/domain/UuidMother'

export class UserIdMother {
  static create(value: string) {
    return new UserId(value)
  }

  static random() {
    return this.create(UuidMother.random())
  }
}
