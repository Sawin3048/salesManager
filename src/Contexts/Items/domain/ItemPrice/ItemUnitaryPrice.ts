import Joi from 'joi'
import { validateShema } from '../../../Shared/infraestructure/JoiShemaValidate'

export class ItemUnitaryPrice {
  readonly value: number
  private readonly name = 'unitaryPrice'
  private readonly errorMessage = 'Sale price is not valid'

  constructor(price: number) {
    this.value = this.ensureIsValid(price)
  }

  private ensureIsValid(value: number) {
    const shema = Joi.number().exist().positive().min(1)
    return validateShema({ value, shema, propertyName: this.name })
  }
}
