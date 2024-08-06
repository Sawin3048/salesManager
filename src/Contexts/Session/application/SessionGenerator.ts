import { SessionHandler } from '../domain/sessionHandler'
import { UserId } from '../domain/userId'

export class SessionGenerator {
  constructor(private readonly sessionHandler: SessionHandler) { }

  async run(id: string) {
    const userId = new UserId(id)
    return await this.sessionHandler.generate(userId)
  }
}
