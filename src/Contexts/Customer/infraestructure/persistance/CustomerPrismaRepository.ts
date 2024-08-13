import { prisma } from '../../../Shared/infraestructure/persistence/prisma/db'
import { Customer } from '../../domain/Customer'
import { CustomerRUC } from '../../domain/CustomerCin'
import { CustomerRepository } from '../../domain/CustomerRepository'

export class CustomerPrismaRepository implements CustomerRepository {
  async save(customer: Customer) {
    await prisma.customer.create({
      data: {
        name: customer.name.value,
        ruc: customer.ruc.value,
        lastname: customer.ruc.value
      }
    })
  }

  async search(ruc: CustomerRUC) {
    const data = await prisma.customer.findFirst({ where: { ruc: ruc.value } })
    if (data == null) return null
    return Customer.fromPrimitives(data)
  }

  async searchAll() {
    const data = await prisma.customer.findMany()
    return data.map(c => Customer.fromPrimitives({
      name: c.name,
      lastname: c.lastname,
      ruc: c.ruc
    }))
  }
}
