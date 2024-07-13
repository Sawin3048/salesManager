import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'
import { NumberValueObject } from '../../Shared/domain/value-object/NumberValueObject'

export class ItemCode extends NumberValueObject {
  readonly value
  constructor(code: number) {
    super(code)
    this.value = this.ensureIsValid(code)
  }

  private ensureIsValid(value: number): number {
    const shema = Joi.number().exist().positive()
    return validateShema({ shema, value })
  }
}
