import { Item } from '../../domain/Item'
import { ItemRepository } from '../../domain/ItemRepository'

export class ItemCreator {
  private readonly itemRepository: ItemRepository
  constructor(dependencies: { itemRepository: ItemRepository }) {
    this.itemRepository = dependencies.itemRepository
  }

  async run(
    code: number,
    description: string,
    saleType: string,
    price: {
      basePrice: number
      unitaryPrice: number
      wholesalePrice: number
    },
    stock: number
  ) {
    const item = Item.fromPrimitives(
      {
        code,
        description,
        saleType,
        price,
        stock
      })

    return await this.itemRepository.save(item)
  }
}
