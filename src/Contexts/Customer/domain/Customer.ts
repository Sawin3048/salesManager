import { CustomerRUC } from './CustomerCin'
import { CustomerName } from './UserName'
import { CustomerLastname } from './UserLastname'

export class Customer {
  readonly ruc
  readonly name
  readonly lastname
  constructor(params: {
    ruc: CustomerRUC
    name: CustomerName
    lastname: CustomerLastname
  }) {
    this.ruc = params.ruc
    this.name = params.name
    this.lastname = params.lastname
  }

  static fromPrimitives(primitives: {
    ruc: string
    name: string
    lastname: string
  }) {
    return new Customer({
      name: new CustomerName(primitives.name),
      lastname: new CustomerLastname(primitives.lastname),
      ruc: new CustomerRUC(primitives.ruc)
    }
    )
  }

  toPrimitives() {
    return {
      name: this.name.value,
      lastname: this.lastname.value,
      ruc: this.lastname.value
    }
  }
}
