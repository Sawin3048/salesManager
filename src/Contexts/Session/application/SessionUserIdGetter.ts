import { SessionHandler } from '../domain/sessionHandler'

export class SessionUserIdGetter {
  constructor(private readonly sessionHandler: SessionHandler) { }

  async run(session: string) {
    return await this.sessionHandler.getUserId(session)
  }
}
