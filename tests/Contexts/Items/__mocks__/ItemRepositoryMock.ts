import { Item } from '../../../../src/Contexts/Items/domain/Item'
import { ItemRepository } from '../../../../src/Contexts/Items/domain/ItemRepository'

export class ItemRepositoryMock implements ItemRepository {
  private readonly mockSave = jest.fn()
  private readonly mockSearchAll = jest.fn()
  private items: Item[] = []

  // Search All
  async searchAll() {
    this.mockSearchAll()
    return this.items
  }

  returnOnSearchAll(items: Item[]) {
    this.items = items
  }

  assertSearchAll() {
    expect(this.mockSearchAll).toHaveBeenCalled()
  }

  // Save
  async save(item: Item) {
    this.mockSave(item)
  }

  assertSaveHasBeenCalledWith(item: Item) {
    expect(this.mockSave).toHaveBeenCalledWith(item)
  }
}
