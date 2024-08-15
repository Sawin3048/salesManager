import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '../../../Shared/infraestructure/persistence/prisma/db'
import { Customer } from '../../domain/Customer'
import { CustomerRUC } from '../../domain/CustomerCin'
import { CustomerRepository } from '../../domain/CustomerRepository'
import { EntityAlreadyExists } from '../EntityAlreadyExist'

export class CustomerPrismaRepository implements CustomerRepository {
  async save(customer: Customer) {
    try {
      await prisma.customer.create({
        data: {
          name: customer.name.value,
          ruc: customer.ruc.value,
          lastname: customer.ruc.value
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new EntityAlreadyExists()
      }
      throw error
    }
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
