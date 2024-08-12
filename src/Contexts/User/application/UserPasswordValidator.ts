import { UserRepository } from '../domain/UserRepository'
import { UserId } from '../domain/UserId'
import { StringHasher } from '../../Shared/domain/StringHasher'
import { InvalidAuth } from '../domain/InvalidAuth'

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

  async run(id: string, password: string) {
    const user = await this.repository.search(new UserId(id))
    if (user == null) throw new InvalidAuth()

    return await this.hasher.checkHash(password, user.password.value)
  }
}
