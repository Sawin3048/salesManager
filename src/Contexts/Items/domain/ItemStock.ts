import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class ItemStock {
  readonly value: number
  private readonly name = 'stock'
  private readonly errorMessage = 'Inventory value is not valid'

  constructor(stock: number) {
    this.value = this.ensureIsValid(stock)
  }

  private ensureIsValid(value: number) {
    const shema = Joi.number().exist().positive().min(0)
    return validateShema({ value, shema, propertyName: this.name })
  }
}
