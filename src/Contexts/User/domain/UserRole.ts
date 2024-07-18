import Joi from 'joi'
import { validateShema } from '../../Shared/infraestructure/JoiShemaValidate'

export type UserRolePosiblesValues = typeof UserRole.posibleValues[keyof typeof UserRole.posibleValues]

export class UserRole {
  readonly value: 'cashier' | 'generic' | 'manager'
  private readonly name = 'role'
  static posibleValues = { CASHIER: 'cashier', GENERIC: 'generic', MANAGER: 'manager' }

  constructor(role: string) {
    this.value = this.ensureIsValid(role)
  }

  private ensureIsValid(value: string) {
    const shema = Joi.string().exist().valid('cashier', 'generic', 'manager')
    return validateShema({ value, shema, propertyName: this.name })
  }
}
