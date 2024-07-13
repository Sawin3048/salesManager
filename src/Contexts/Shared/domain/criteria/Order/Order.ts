import { OrderBy } from './OrderBy'
import { OrderType, OrderTypes } from './OrderType'

export class Order {
  readonly orderBy
  readonly orderType
  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy
    this.orderType = orderType
  }

  static fromValues(orderBY?: string, orderType?: string) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!orderBY) {
      return Order.none()
    }

    return new Order(new OrderBy(orderBY), OrderType.fromValue(orderType ?? OrderTypes.ASC))
  }

  static none(): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE))
  }

  static desc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC))
  }

  static asc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC))
  }

  public hasOrder() {
    return !this.orderType.isNone()
  }
}
