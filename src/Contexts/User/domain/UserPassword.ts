import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class UserPassword {
  private readonly name = 'password'
  readonly value

  constructor(password: string) {
    this.value = this.ensureIsValid(password)
  }

  private ensureIsValid(value: string): string {
    const shema = Joi.string().exist().min(8)
    return validateShema({ value, shema, propertyName: this.name })
  }
}
