import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'
import { NumberValueObject } from '../../Shared/domain/value-object/NumberValueObject'

export class ItemStock extends NumberValueObject {
  readonly value: number
  private readonly errorMessage = 'Inventory value is not valid'

  constructor(stock: number) {
    super(stock)
    this.value = this.ensureIsValid(stock)
  }

  private ensureIsValid(value: number) {
    const shema = Joi.number().exist().positive().min(1)
    return validateShema({ value, shema })
  }
}
