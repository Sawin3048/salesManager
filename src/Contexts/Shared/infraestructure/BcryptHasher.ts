import { StringHasher } from '../domain/StringHasher'
import bcrypt from 'bcrypt'

export class BcryptHasher implements StringHasher {
  async hash(value: string) {
    return await bcrypt.hash(value, Number(process.env.SALT))
  }

  async checkHash(value: string, hashedValue: string) {
    return await bcrypt.compare(value, hashedValue)
  }
}
