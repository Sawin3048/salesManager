import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { UserId } from '../domain/userId'
import { SessionHandler } from '../domain/sessionHandler'
import { InvalidSessionError } from '../domain/InvalidSessionError'

export class SessionHandlerWithJWT implements SessionHandler {
  private readonly secret: string
  private readonly expiredTime: string | number

  constructor(dependencies: {
    secret: string
    expiredTime: string | number
  }) {
    this.secret = dependencies.secret
    this.expiredTime = dependencies.expiredTime
  }

  async verify(sessionToken: string) {
    try {
      const payload = jwt.verify(sessionToken, this.secret)
      const id = this.getUserIdByPayload(payload)
      console.log({ payload })
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
    throw new InvalidSessionError()
  }
}
