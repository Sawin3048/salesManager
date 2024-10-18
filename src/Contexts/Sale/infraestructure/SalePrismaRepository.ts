
import { SaleRepository } from '../domain/SaleRepository'
import { prisma } from '../../Shared/infraestructure/persistence/prisma/db'
import { Sale } from '../domain/Sale'
import { SaleItem } from '../domain/SaleItem'
import { SaleId } from '../domain/SaleId'
import { SaleCreatedAt } from '../domain/SaleCreatedAt'

export class SalePrismaRepository implements SaleRepository {
  async save(sale: Sale) {
    await prisma.sale.create({
      data: {
        id: sale.id.value.toString(),
        created_at: sale.createdAt.value.toISOString(),
        total: 10,
        items: sale.items.map(item => item.toPrimitives())
      }
    })
  }

  async searchAll(): Promise<Sale[]> {
    const rawData = await prisma.sale.findMany()

    const sales = rawData.map(rawSale => {
      const rawItem = rawSale.items as any[]

      const saleItems = rawItem.map(item => {
        return SaleItem.fromPrimitives(item)
      })

      return new Sale({
        id: new SaleId(rawSale.id),
        createdAt: new SaleCreatedAt(rawSale.created_at),
        items: saleItems
      })
    })

    return sales
  }

  // async findItems(ids: SaleItemId[]) {
  //   const items = await prisma.item.findMany({
  //     where: { id: { in: ids.map(id => id.value) } }
  //   })
  //   const saleItems = items.map(item => {
  //     return SaleItem.fromPrimitives({
  //       data: {
  //         id: item.id,
  //         stock: item.stock,
  //         code: item.code as any,
  //         description: item.description,
  //         saleType: item.saleType as any,
  //         price: {
  //           basePrice: item.basePrice,
  //           unitaryPrice: item.unitaryPrice,
  //           wholesalePrice: item.wholesalePrice
  //         }
  //       },
  //       amount: 10
  //     })
  //   })

  //   return saleItems
  // }
}
