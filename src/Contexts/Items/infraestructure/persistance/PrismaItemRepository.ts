import { ItemRepository } from '../../domain/ItemRepository'
import { prisma } from '../../../Shared/infraestructure/persistence/prisma/db'
import { Item } from '../../domain/Item'
import { ItemCode } from '../../domain/ItemCode'
import { ItemId } from '../../domain/ItemId'

export class PrismaItemRepository implements ItemRepository {
  async save(item: Item) {
    await prisma.item.create({
      data: {
        id: item.id.value,
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
        id: data.id,
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

  async searchByCode(code: ItemCode) {
    const rawData = await prisma.item.findUnique({
      where: { code: code.value.toString() }
    })

    if (rawData == null) {
      return null
    }

    return Item.fromPrimitives({
      id: rawData.id,
      code: Number(rawData.code),
      description: rawData.description,
      saleType: rawData.saleType,
      price: {
        basePrice: rawData.basePrice,
        unitaryPrice: rawData.unitaryPrice,
        wholesalePrice: rawData.wholesalePrice
      },
      stock: rawData.stock
    })
  }

  async searchById(id: ItemId) {
    const rawData = await prisma.item.findUnique({ where: { id: id.value } })

    if (rawData == null) {
      return null
    }

    return Item.fromPrimitives({
      id: rawData.id,
      code: Number(rawData.code),
      description: rawData.description,
      saleType: rawData.saleType,
      price: {
        basePrice: rawData.basePrice,
        unitaryPrice: rawData.unitaryPrice,
        wholesalePrice: rawData.wholesalePrice
      },
      stock: rawData.stock
    })
  }
}
