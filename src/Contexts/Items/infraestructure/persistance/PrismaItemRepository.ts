import { ItemRepository } from '../../domain/ItemRepository'
import { prisma } from '../../../Shared/infraestructure/persistence/prisma/db'
import { Item } from '../../domain/Item'

export class PrismaItemRepository implements ItemRepository {
  async save(item: Item) {
    await prisma.item.create({
      data: {
        code: item.code.value.toString(),
        description: item.description.value.toString(),
        saleType: item.saleType.value.toString(),
        basePrice: item.price.basePrice.value,
        unitaryPrice: item.price.unitaryPrice.value,
        wholesalePrice: item.price.wholesalePrice.value,
        stock: item.stock.value
      }
    })
  }

  async searchAll() {
    const rawData = await prisma.item.findMany()
    return rawData.map(data => {
      return Item.fromPrimitives({
        code: Number(data.code),
        description: data.code,
        saleType: data.saleType,
        price: {
          basePrice: data.basePrice,
          unitaryPrice: data.unitaryPrice,
          wholesalePrice: data.wholesalePrice
        },
        stock: data.stock
      })
    })
  }
}
