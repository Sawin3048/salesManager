import Joi from 'joi'
import { validateShema } from '../../../Shared/infraestructure/JoiShemaValidate'
import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject'

export class ItemUnitaryPrice extends NumberValueObject {
  readonly value: number
  private readonly errorMessage = 'Sale price is not valid'

  constructor(price: number) {
    super(price)
    this.value = this.ensureIsValid(price)
  }

  private ensureIsValid(value: number) {
    const shema = Joi.number().exist().positive().min(1)
    return validateShema({ value, shema })
  }
}
