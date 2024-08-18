import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export class ReceiptCreatedAt {
  private readonly name = 'createdAt'
  readonly value
  constructor(createdAt: string | Date) {
    this.value = this.ensureIsValid(createdAt)
  }

  private ensureIsValid(value: string | Date): Date {
    let date = value
    if (typeof value === 'string') {
      date = new Date(value)
    }
    const shema = Joi.date().exist()

    return validateShema({ shema, value: date, propertyName: this.name })
  }
}
