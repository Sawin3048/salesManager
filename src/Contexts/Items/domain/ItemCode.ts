import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class ItemCode {
  readonly value
  private readonly name = 'code'

  constructor(code: number) {
    this.value = this.ensureIsValid(code)
  }

  private ensureIsValid(value: number): number {
    const shema = Joi.number().exist().positive()
    return validateShema({ shema, value, propertyName: this.name })
  }
}
