import { InvalidArgumentError } from '../../InvalidArgumentError'
import { EnumValueObject } from '../../value-object/EnumValueObject'

export const Operator = {
  EQUAL: '=',
  NOT_EQUAL: '!=',
  GT: '>',
  LT: '<',
  CONTAINS: 'CONTAINS',
  NOT_CONTAINS: 'NOT_CONTAINS'
} as const
export type OperatorValue = typeof Operator[keyof typeof Operator]
const OperatorsList = Object.values(Operator) as OperatorValue[]

export class FilterOperator extends EnumValueObject<OperatorValue> {
  constructor(value: OperatorValue) {
    super(value, OperatorsList)
  }

  static fromValue(value: string) {
    for (const operatorValue of OperatorsList) {
      if (value === operatorValue.toString()) {
        return new FilterOperator(operatorValue)
      }
    }

    throw new InvalidArgumentError(`The filter operator ${value} is invalid`)
  }

  isPositive() {
    return this.value !== Operator.NOT_CONTAINS && this.value !== Operator.NOT_EQUAL
  }

  protected throwErrorForInvalidValue(value: OperatorValue): void {
    throw new InvalidArgumentError(`The filter operator ${value} is invalid`)
  }

  static equal() {
    return this.fromValue(Operator.EQUAL)
  }
}
