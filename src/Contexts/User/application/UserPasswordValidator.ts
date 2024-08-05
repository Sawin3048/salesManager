import { UserRepository } from '../domain/UserRepository'
import { UserId } from '../domain/UserId'
import { DomainError } from '../../Shared/domain/DomainError'
import { StringHasher } from '../../Shared/domain/StringHasher'

export class UserPasswordValidator {
  constructor(private readonly repository: UserRepository, private readonly hasher: StringHasher) { }

  async run(id: string, password: string) {
    const user = await this.repository.search(new UserId(id))

    if (user == null) throw new DomainError('User not exist')

    return await this.hasher.checkHash(password, user.password.value)
  }
}
