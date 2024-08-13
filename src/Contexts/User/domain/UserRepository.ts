import { Nullable } from '../../../../tests/Contexts/Shared/domain/Nullable'
import { UserId } from './UserId'
import { User } from './User'
import { UserCin } from './UserCin'

export interface UserRepository {
  save: (user: User) => Promise<void>
  search: (id: UserId) => Promise<Nullable<User>>
  searchByCin: (cin: UserCin) => Promise<Nullable<User>>
  searchAll: () => Promise<User[]>
}
