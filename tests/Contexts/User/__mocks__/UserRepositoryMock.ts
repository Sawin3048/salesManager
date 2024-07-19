import { User } from '../../../../src/Contexts/User/domain/User'
import { UserRepository } from '../../../../src/Contexts/User/domain/UserRepository'

export class UserRepositoryMock implements UserRepository {
  private readonly mockSave = jest.fn()
  private readonly mockSearchAll = jest.fn()
  private users: User[] = []

  // Search All
  async searchAll() {
    this.mockSearchAll()
    return this.users
  }

  returnOnSearchAll(users: User[]) {
    this.users = users
  }

  assertSearchAll() {
    expect(this.mockSearchAll).toHaveBeenCalled()
  }

  // Save
  async save(user: User) {
    this.mockSave(user)
  }

  assertSaveHasBeenCalledWith(user: User) {
    expect(this.mockSave).toHaveBeenCalledWith(user)
  }

  private removePassword(user: User) {

  }
}
