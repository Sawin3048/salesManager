import { UserRepository } from '../domain/UserRepository'

export class UserFinder {
  private readonly repository: UserRepository

  constructor(dependencies: { userRepository: UserRepository }) {
    this.repository = dependencies.userRepository
  }

  async run() {
    return await this.repository.searchAll()
  }
}
