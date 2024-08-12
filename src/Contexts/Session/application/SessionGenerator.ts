import { SessionHandler } from '../domain/sessionHandler'
import { UserId } from '../domain/userId'

export class SessionGenerator {
  private readonly sessionHandler: SessionHandler
  constructor(dependencies: {
    sessionHandler: SessionHandler
  }) {
    this.sessionHandler = dependencies.sessionHandler
  }

  async run(id: string) {
    const userId = new UserId(id)
    return await this.sessionHandler.generate(userId)
  }
}
