import { SessionHandler } from '../domain/sessionHandler'

export class SessionValidator {
  constructor(private readonly sessionHandler: SessionHandler) { }

  async run(session: string) {
    return await this.sessionHandler.verify(session)
  }
}
