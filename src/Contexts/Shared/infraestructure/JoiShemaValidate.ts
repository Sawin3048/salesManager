import { Schema, ValidationOptions } from 'joi'
import { InvalidArgumentError } from '../domain/InvalidArgumentError'

export function validateShema(
  { shema, value, options, aditionalMessage, propertyName }: { shema: Schema, value: unknown, options?: ValidationOptions, aditionalMessage?: string, propertyName: string }
) {
  const result = shema.validate(value, { abortEarly: true, ...options })
  if (result.error === undefined) return result.value
  throw new InvalidArgumentError(JSON.stringify({
    property: propertyName,
    message: result.error.message,
    aditionalInfo: aditionalMessage ?? undefined
  }))
}
