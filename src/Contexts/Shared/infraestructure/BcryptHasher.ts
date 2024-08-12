import { StringHasher } from '../domain/StringHasher'
import bcrypt from 'bcrypt'

export class BcryptHasher implements StringHasher {
  private readonly salt
  constructor(dependencies: { hasherSalt: number }) {
    this.salt = dependencies.hasherSalt
  }

  async hash(value: string) {
    return await bcrypt.hash(value, this.salt)
  }

  async checkHash(value: string, hashedValue: string) {
    return await bcrypt.compare(value, hashedValue)
  }
}
