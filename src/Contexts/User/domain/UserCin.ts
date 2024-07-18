import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class UserCin {
  readonly value
  private readonly name = 'cin'

  constructor(cin: number) {
    this.value = this.ensureIsValid(cin)
  }

  private ensureIsValid(value: number): number {
    const shema = Joi.number().exist().positive()
    return validateShema({ shema, value, propertyName: this.name })
  }
}
