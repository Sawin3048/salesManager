import { Item } from '../../domain/Item'
import { ItemRepository } from '../../domain/ItemRepository'

export class ItemCreator {
  private readonly itemRepository: ItemRepository
  constructor(dependencies: { itemRepository: ItemRepository }) {
    this.itemRepository = dependencies.itemRepository
  }

  async run(
    params: {
      id: string
      code: number
      description: string
      saleType: string
      price: {
        basePrice: number
        unitaryPrice: number
        wholesalePrice: number
      }
      stock: number
    }
  ) {
    const item = Item.fromPrimitives(
      {
        id: params.id,
        code: params.code,
        description: params.description,
        saleType: params.saleType,
        price: params.price,
        stock: params.stock
      })

    return await this.itemRepository.save(item)
  }
}
