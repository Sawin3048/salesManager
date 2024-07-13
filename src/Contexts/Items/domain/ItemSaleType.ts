import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'
import { StringValueObject } from '../../Shared/domain/value-object/StringValueObject'

export type ItemSaleTypePosiblesValues = typeof ItemSaleType.posibleValues[keyof typeof ItemSaleType.posibleValues]

export class ItemSaleType extends StringValueObject {
  readonly value: 'bulk' | 'unit'
  private readonly errorMessage = 'Sale type is not valid. bulk | unit'
  static posibleValues = { BULK: 'bulk', UNIT: 'unit' }
  constructor(saleType: string) {
    super(saleType)
    this.value = this.ensureIsValid(saleType)
  }

  private ensureIsValid(value: string) {
    const shema = Joi.string().exist().valid('bulk', 'unit')
    return validateShema({ value, shema })
  }
}
