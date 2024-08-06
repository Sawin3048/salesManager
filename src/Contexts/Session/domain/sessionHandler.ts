import { UserId } from './userId'

interface Session {
  authenticated: boolean
  userId: string | null
}

export interface SessionHandler {
  verify: (session: string) => Promise<Session>
  generate: (id: UserId) => Promise<string>
  getUserId: (session: string) => Promise<UserId>
}
