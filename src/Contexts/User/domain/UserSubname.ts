import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class UserLastname {
  readonly value
  private readonly name = 'subname'

  constructor(subname: string) {
    this.value = this.ensureIsValid(subname)
  }

  private ensureIsValid(value: string): string {
    const shema = Joi.string().min(1).max(30)
    return validateShema({ shema, value, propertyName: this.name })
  }
}
