import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export type ItemSaleTypePosiblesValues = typeof ItemSaleType.posibleValues[keyof typeof ItemSaleType.posibleValues]

export class ItemSaleType {
  readonly value: 'bulk' | 'unit'
  private readonly name = 'saleType'
  private readonly errorMessage = 'Sale type is not valid. bulk | unit'
  static posibleValues = { BULK: 'bulk', UNIT: 'unit' }

  constructor(saleType: string) {
    this.value = this.ensureIsValid(saleType)
  }

  private ensureIsValid(value: string) {
    const shema = Joi.string().exist().valid('bulk', 'unit')
    return validateShema({ value, shema, propertyName: this.name })
  }
}
