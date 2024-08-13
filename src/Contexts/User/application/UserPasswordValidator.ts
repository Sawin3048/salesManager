import { UserRepository } from '../domain/UserRepository'
import { StringHasher } from '../../Shared/domain/StringHasher'
import { InvalidAuth } from '../domain/InvalidAuth'
import { UserCin } from '../domain/UserCin'

export class UserPasswordValidator {
  private readonly repository: UserRepository
  private readonly hasher: StringHasher
  constructor(dependencies: {
    userRepository: UserRepository
    stringHasher: StringHasher
  }) {
    this.repository = dependencies.userRepository
    this.hasher = dependencies.stringHasher
  }

  async run(cin: string, password: string) {
    const user = await this.repository.searchByCin(new UserCin(Number(cin) ?? cin))
    if (user == null) throw new InvalidAuth()
    const isValidPassword = await this.hasher.checkHash(password, user.password.value)
    if (!isValidPassword) throw new InvalidAuth()
    return (user.id)
  }
}
