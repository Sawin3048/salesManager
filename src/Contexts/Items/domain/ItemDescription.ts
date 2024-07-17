import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class ItemDescription {
  readonly value: string
  private readonly name = 'description'

  constructor(description: string) {
    this.value = this.ensureIsValid(description)
  }

  private ensureIsValid(value: string) {
    const shema = Joi.string().exist().min(1).max(200)
    return validateShema({ value, shema, propertyName: this.name })
  }
}
