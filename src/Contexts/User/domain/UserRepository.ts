import { User } from './User'

export interface UserRepository {
  save: (user: User) => Promise<void>
  searchAll: () => Promise<User[]>
}
