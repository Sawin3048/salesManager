import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class UserId {
  readonly value
  private readonly name = 'id'

  constructor(name: string) {
    this.value = this.ensureIsValid(name)
  }

  private ensureIsValid(value: string): string {
    const shema = Joi.string().exist().uuid()
    return validateShema({ shema, value, propertyName: this.name })
  }
}
