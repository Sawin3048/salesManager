import { ItemCreator } from '../../../../src/Contexts/Items/application/Create/ItemCreator'
import { ItemRepositoryMock } from '../__mocks__/ItemRepositoryMock'
import { ItemMother } from '../domain/ItemMother'

describe('ItemCreator', () => {
  it('Creates an item', async () => {
    const item = ItemMother.random()

    const repository = new ItemRepositoryMock()
    const service = new ItemCreator(repository)

    await service.run(
      item.code.value,
      item.description.value,
      item.saleType.value,
      item.price.toPrimitives(),
      item.stock.value
    )

    repository.assertSaveHasBeenCalledWith(item)
  })
})
