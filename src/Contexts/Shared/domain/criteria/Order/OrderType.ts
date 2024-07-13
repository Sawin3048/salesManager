import { InvalidArgumentError } from '../../InvalidArgumentError'
import { EnumValueObject } from '../../value-object/EnumValueObject'

export const OrderTypes = {
  ASC: 'asc',
  DESC: 'desc',
  NONE: 'none'
} as const

export type OrderTypesValues = typeof OrderTypes[keyof typeof OrderTypes]
const OrderTypesList = Object.values(OrderTypes)

export class OrderType extends EnumValueObject<OrderTypesValues> {
  constructor(value: OrderTypesValues) {
    super(value, OrderTypesList)
  }

  static fromValue(value: string) {
    for (const orderTypeValue of OrderTypesList) {
      if (value === orderTypeValue.toString()) {
        return new OrderType(orderTypeValue)
      }
    }

    throw new InvalidArgumentError(`The order type ${value} is invalid`)
  }

  public isNone() {
    return this.value === OrderTypes.NONE
  }

  public isAsc() {
    return this.value === OrderTypes.ASC
  }

  protected throwErrorForInvalidValue(value: OrderTypesValues): void {
    throw new InvalidArgumentError(`The order type ${value} is invalid`)
  }
}
