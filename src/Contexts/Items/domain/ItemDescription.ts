import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'

export class ItemDescription extends StringValueObject {
  readonly value: string
  constructor(description: string) {
    super(description)
    this.value = this.ensureIsValid(description)
  }

  private ensureIsValid(value: string) {
    const shema = Joi.string().exist().min(1).max(200)
    return validateShema({ value, shema })
  }
}
