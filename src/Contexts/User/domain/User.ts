import { UserId } from './UserId'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'
import { UserRole } from './UserRole'
import { UserLastname } from './UserSubname'
import { UserCin } from './UserCin'

export class User {
  constructor(
    readonly id: UserId,
    readonly name: UserName,
    readonly lastname: UserLastname,
    readonly cin: UserCin,
    readonly role: UserRole,
    readonly password: UserPassword
  ) { }

  static fromPrimitives(primitives: {
    id: string
    name: string
    lastname: string
    cin: number
    role: string
    password: string
  }) {
    return new User(
      new UserId(primitives.id),
      new UserName(primitives.name),
      new UserLastname(primitives.lastname),
      new UserCin(primitives.cin),
      new UserRole(primitives.role),
      new UserPassword(primitives.password)
    )
  }

  toPrimitives() {
    return {
      id: this.name.value,
      name: this.name.value,
      lastname: this.lastname.value,
      cin: this.cin.value,
      role: this.role.value,
      password: this.password.value
    }
  }
}
