import { SessionHandler } from '../domain/sessionHandler'

export class SessionUserIdGetter {
  private readonly sessionHandler: SessionHandler
  constructor(dependencies: {
    sessionHandler: SessionHandler
  }) {
    this.sessionHandler = dependencies.sessionHandler
  }

  async run(session: string) {
    return await this.sessionHandler.getUserId(session)
  }
}
