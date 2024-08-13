import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class CustomerRUC {
  readonly value
  private readonly name = 'ruc'

  constructor(ruc: string) {
    this.value = this.ensureIsValid(ruc)
  }

  private ensureIsValid(value: string): string {
    const shema = Joi.string().exist().min(1)
    return validateShema({ shema, value, propertyName: this.name })
  }
}
