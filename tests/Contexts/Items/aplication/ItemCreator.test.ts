import { ItemCreator } from '../../../../src/Contexts/Items/application/Create/ItemCreator'
import { ItemRepositoryMock } from '../__mocks__/ItemRepositoryMock'
import { ItemMother } from '../domain/ItemMother'

describe('ItemCreator', () => {
  it('Creates an item', async () => {
    const item = ItemMother.random()

    const repository = new ItemRepositoryMock()
    const service = new ItemCreator(repository)
    const primitives = item.toPrimitives()

    await service.run(
      primitives.code,
      primitives.description,
      primitives.saleType,
      primitives.price,
      primitives.stock
    )

    repository.assertSaveHasBeenCalledWith(item)
  })
})
