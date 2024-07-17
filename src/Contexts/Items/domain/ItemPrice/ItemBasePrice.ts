import Joi from 'joi'
import { validateShema } from '../../../Shared/infraestructure/JoiShemaValidate'

export class ItemBasePrice {
  readonly value: number
  private readonly errorMessage = 'Buy price is not valid'
  private readonly name = 'basePrice'
  constructor(price: number) {
    this.value = this.ensureIsValid(price)
  }

  private ensureIsValid(value: number) {
    const shema = Joi.number().exist().positive().min(1)
    return validateShema({ value, shema, propertyName: this.name })
  }
}
