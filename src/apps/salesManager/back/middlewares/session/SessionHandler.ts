import jwt from 'jsonwebtoken'

export class SessionHandler {
  constructor(private readonly secret: string, private readonly expiredTime: string | number) { }

  verify(sessionToken: string) {
    return jwt.verify(sessionToken, this.secret)
  }

  generate(userId: string) {
    const payload = { id: userId }
    const options = { expiresIn: this.expiredTime }

    return jwt.sign(payload, this.secret, options)
  }
}
