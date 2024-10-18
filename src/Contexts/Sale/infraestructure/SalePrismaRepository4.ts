
import { SaleRepository } from '../domain/SaleRepository'
import { prisma } from '../../Shared/infraestructure/persistence/prisma/db'
import { Sale } from '../domain/Sale'
import { SaleItem } from '../domain/SaleItem'
import { SaleItems } from '../domain/SaleItems'
import { SaleId } from '../domain/SaleId'
import { SaleCreatedAt } from '../domain/SaleCreatedAt'
import { Item } from '../../Items/domain/Item'

export class SalePrismaRepository implements SaleRepository {
  async save(sale: Sale) {
    await prisma.sale.create({
      data: {
        id: sale.id.value.toString(),
        created_at: sale.createdAt.value,
        total: sale.total,
        items: sale.items.toPrimitives()
      }
    })
  }

  async searchAll(): Promise<Sale[]> {
    const rawData = await prisma.sale.findMany()

    const sales = rawData.map(rawSale => {
      const rawItem = rawSale.items as Array<{ amount: number, item: any }>

      const rawSaleItems = rawItem.map(({ amount, item: data }) => {
        return SaleItem.fromPrimitives({ amount, data: Item.fromPrimitives(data) })
      })

      return new Sale({
        id: new SaleId(rawSale.id),
        createdAt: new SaleCreatedAt(rawSale.created_at),
        items: new SaleItems(rawSaleItems)
      })
    })

    return sales
  }
}

const repository = new SalePrismaRepository()
repository.searchAll().then(r => console.log(r)).catch(e => { throw e })
