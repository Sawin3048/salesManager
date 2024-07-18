import { UserRepository } from '../domain/UserRepository'

export class UserFinder {
  constructor(private readonly repository: UserRepository) { }
  async run() {
    return await this.repository.searchAll()
  }
}
