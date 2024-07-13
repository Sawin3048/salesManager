import { Schema, ValidationOptions } from 'joi'
import { InvalidArgumentError } from '../domain/InvalidArgumentError'

export function validateShema(
  { shema, value, options, message }: { shema: Schema, value: unknown, options?: ValidationOptions, message?: string }
) {
  const result = shema.validate(value, { abortEarly: true, ...options })
  if (result.error === undefined) return result.value
  throw new InvalidArgumentError(message ?? result.error.message)
}
