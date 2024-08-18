import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { UserId } from '../domain/userId'
import { SessionHandler } from '../domain/sessionHandler'
import { InvalidArgumentError } from '../../Shared/domain/InvalidArgumentError'

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

      if (id == null) return this.badResponse()

      return this.goodResponse(id)
    } catch (error) {
      if (error instanceof JsonWebTokenError) return this.badResponse()
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
    try {
      if (typeof payload === 'object') return new UserId(payload?.id)
      return null
    } catch (error) {
      if (error instanceof InvalidArgumentError) return null
      throw error
    }
  }

  private goodResponse(id: UserId) {
    return { authenticated: true, userId: id.value }
  }

  private badResponse() {
    return { authenticated: true, userId: null }
  }
}
