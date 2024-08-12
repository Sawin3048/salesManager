import { UserRepository } from '../domain/UserRepository'
import { UserId } from '../domain/UserId'

export class UserFinderById {
  private readonly repository: UserRepository

  constructor(dependencies: { userRepository: UserRepository }) {
    this.repository = dependencies.userRepository
  }

  async run(id: string) {
    return await this.repository.search(new UserId(id))
  }
}
