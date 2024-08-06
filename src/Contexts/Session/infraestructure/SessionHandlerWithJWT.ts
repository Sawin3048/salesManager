import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { UserId } from '../domain/userId'
import { SessionHandler } from '../domain/sessionHandler'
import { DomainError } from '../../Shared/domain/DomainError'

export class SessionHandlerWithJWT implements SessionHandler {
  /**
   * @param secret
   * @param expiredTime
   * expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).
   * Eg: 60, "2 days", "10h", "7d"
   */
  constructor(private readonly secret: string, private readonly expiredTime: string | number) { }
  async verify(sessionToken: string) {
    try {
      const payload = jwt.verify(sessionToken, this.secret)
      const id = this.getUserIdByPayload(payload)

      return { authenticated: true, userId: id.value }
    } catch (error) {
      if (error instanceof JsonWebTokenError) return { authenticated: false, userId: null }
      throw error
    }
  }

  async generate(id: UserId) {
    const payload = { id: id.value }
    const options = { expiresIn: this.expiredTime }

    return jwt.sign(payload, this.secret, options)
  }

  async getUserId(sessionToken: string) {
    const payload = jwt.decode(sessionToken)
    return this.getUserIdByPayload(payload)
  }

  private getUserIdByPayload(payload: string | jwt.JwtPayload | null) {
    if (typeof payload === 'object') return new UserId(payload?.id)
    // TODO Write a custom domain error
    throw new DomainError('The session user id is invalid')
  }
}
