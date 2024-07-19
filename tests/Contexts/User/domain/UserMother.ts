import { UserCin } from '../../../../src/Contexts/User/domain/UserCin'
import { UserId } from '../../../../src/Contexts/User/domain/UserId'
import { UserName } from '../../../../src/Contexts/User/domain/UserName'
import { UserPassword } from '../../../../src/Contexts/User/domain/UserPassword'
import { UserRole } from '../../../../src/Contexts/User/domain/UserRole'
import { UserLastname } from '../../../../src/Contexts/User/domain/UserSubname'
import { User } from '../../../../src/Contexts/User/domain/User'
import { UserIdMother } from './UserIdMother'
import { UserNameMother } from './UserNameMother'
import { UserLastnameMother } from './UserLastnameMother'
import { UserCinMother } from './UserCinMother'
import { UserRoleMother } from './UserRoleMother'
import { UserPasswordMother } from './UserPasswordMother'

export class UserMother {
  static create(
    id: UserId,
    name: UserName,
    lastname: UserLastname,
    cin: UserCin,
    role: UserRole,
    password: UserPassword
  ) {
    return new User(id, name, lastname, cin, role, password)
  }

  static random() {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
      UserLastnameMother.random(),
      UserCinMother.random(),
      UserRoleMother.random(),
      UserPasswordMother.random()
    )
  }
}
