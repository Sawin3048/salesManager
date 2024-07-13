import Joi from 'joi'
import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject'
import { validateShema } from '../../../Shared/infraestructure/JoiShemaValidate'

export class ItemWholeSalePrice extends NumberValueObject {
  readonly value: number
  constructor(price: number) {
    super(price)
    this.value = this.ensureIsValid(price)
  }

  private ensureIsValid(value: number) {
    const shema = Joi.number().exist().positive().min(1)
    return validateShema({ value, shema })
  }
}
