import { ItemRepository } from '../../domain/ItemRepository'

export class ItemFinder {
  constructor(private readonly itemRepository: ItemRepository) { }
  async run() {
    return await this.itemRepository.searchAll()
  }
}
