import Joi from 'joi'
import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject'
import { validateShema } from '../../../Shared/infraestructure/JoiShemaValidate'

export class SaleItemAmount extends NumberValueObject {
  constructor(amount: number) {
    super(amount)
    this.ensureIsValid(amount)
  }

  ensureIsValid(amount: number) {
    const shema = Joi.number().exist().positive().min(1)
    return validateShema({ value: amount, shema, propertyName: 'itemAmount' })
  }
}
