import { ItemRepository } from '../../domain/ItemRepository'

export class ItemFinder {
  private readonly itemRepository: ItemRepository
  constructor(dependencies: { itemRepository: ItemRepository }) {
    this.itemRepository = dependencies.itemRepository
  }

  async run() {
    return await this.itemRepository.searchAll()
  }
}
