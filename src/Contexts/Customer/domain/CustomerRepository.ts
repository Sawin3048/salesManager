import { Nullable } from '../../../../tests/Contexts/Shared/domain/Nullable'
import { Customer } from './Customer'
import { CustomerRUC } from './CustomerCin'

export interface CustomerRepository {
  save: (customer: Customer) => Promise<void>
  search: (ruc: CustomerRUC) => Promise<Nullable<Customer>>
  searchAll: () => Promise<Customer[]>
}
