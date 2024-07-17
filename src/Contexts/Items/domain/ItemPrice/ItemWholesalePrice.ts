import Joi from 'joi'
import { validateShema } from '../../../Shared/infraestructure/JoiShemaValidate'

export class ItemWholeSalePrice {
  readonly value: number
  private readonly name = 'wholeSalePrice'
  constructor(price: number) {
    this.value = this.ensureIsValid(price)
  }

  private ensureIsValid(value: number) {
    const shema = Joi.number().exist().positive().min(1)
    return validateShema({ value, shema, propertyName: this.name })
  }
}
