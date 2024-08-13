import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class CustomerName {
  readonly value
  private readonly name = 'name'

  constructor(name: string) {
    this.value = this.ensureIsValid(name)
  }

  private ensureIsValid(value: string): string {
    const shema = Joi.string().min(1).max(30)
    return validateShema({ shema, value, propertyName: this.name })
  }
}
