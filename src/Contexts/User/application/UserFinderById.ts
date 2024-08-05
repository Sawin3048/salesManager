import { UserRepository } from '../domain/UserRepository'
import { UserId } from '../domain/UserId'

export class UserFinderById {
  constructor(private readonly repository: UserRepository) { }

  async run(id: string) {
    return await this.repository.search(new UserId(id))
  }
}
