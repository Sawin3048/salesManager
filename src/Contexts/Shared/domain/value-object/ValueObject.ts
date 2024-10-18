import { InvalidArgumentError } from '../InvalidArgumentError'

export type Primitives = string | number | Boolean | boolean | Date

export abstract class ValueObject<T extends Primitives> {
  readonly value: T
  readonly #name
  constructor(value: T, name: string = 'Value') {
    this.value = value
    this.#name = name
    this.ensureValueIsDefined(value)
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(`${this.#name} must be defined`)
    }
  }

  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value
  }

  toString(): string {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return this.value.toString()
  }
}
