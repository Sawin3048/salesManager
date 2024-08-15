import Joi from 'joi'
import { ValueObject } from '../../Shared/domain/value-object/ValueObject'

export class ReceiptCreatedAt {
  private readonly name = 'createdAt'

  constructor(createdAt: string) {
  }

  private ensureIsValid(value: string): Date {
    const shema = Joi.date().exist()
  }
}
