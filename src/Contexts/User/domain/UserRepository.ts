import { Nullable } from '../../../../tests/Contexts/Shared/domain/Nullable'
import { UserId } from './UserId'
import { User } from './User'

export interface UserRepository {
  save: (user: User) => Promise<void>
  search: (id: UserId) => Promise<Nullable<User>>
  searchAll: () => Promise<User[]>
}
