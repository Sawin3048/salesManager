import { InvalidSessionError } from '../domain/InvalidSessionError'
import { SessionHandler } from '../domain/sessionHandler'

export class SessionValidator {
  private readonly sessionHandler: SessionHandler
  constructor(dependencies: {
    sessionHandler: SessionHandler
  }) {
    this.sessionHandler = dependencies.sessionHandler
  }

  async run(session: string) {
    const { authenticated, userId } = await this.sessionHandler.verify(session)
    if (!authenticated || userId == null) throw new InvalidSessionError()
    return userId
  }
}
