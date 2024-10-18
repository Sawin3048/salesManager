import { User } from '../../../../src/Contexts/User/domain/User'
import { UserRepository } from '../../../../src/Contexts/User/domain/UserRepository'
import { UserId } from '../../../../src/Contexts/User/domain/UserId'
import { UserMother } from '../domain/UserMother'
import { UserCin } from '../../../../src/Contexts/User/domain/UserCin'
import { Nullable } from '../../Shared/domain/Nullable'

export class UserRepositoryMock implements UserRepository {
  private readonly mockSave = jest.fn()
  private readonly mockSearchAll = jest.fn()
  private users: User[] = []

  async search(id: UserId) {
    return UserMother.random()
  }

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

  async searchByCin(cin: UserCin) {
    return this.users[0]
  }

  private removePassword(user: User) {

  }
}
