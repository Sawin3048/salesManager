import { ItemCreator } from '../../../../src/Contexts/Items/application/Create/ItemCreator'
import { InvalidArgumentError } from '../../../../src/Contexts/Shared/domain/InvalidArgumentError'
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

  it('Should throw an error when trying to create an item without one property', async () => {
    const repository = new ItemRepositoryMock()
    const service = new ItemCreator(repository)

    const undefinedPropiety = undefined as any

    const serviceRunner = async (index: number) => {
      const item = ItemMother.random()
      const primitives = item.toPrimitives()

      await service.run(
        index === 1 ? primitives.code : undefinedPropiety,
        index === 2 ? primitives.description : undefinedPropiety,
        index === 3 ? primitives.saleType : undefinedPropiety,
        {
          basePrice: index === 4 ? primitives.price.basePrice : undefinedPropiety,
          unitaryPrice: index === 5 ? primitives.price.unitaryPrice : undefinedPropiety,
          wholesalePrice: index === 6 ? primitives.price.wholesalePrice : undefinedPropiety
        },
        index === 7 ? primitives.stock : undefinedPropiety
      )
    }

    expect.assertions(7)
    for (let index = 1; index <= 7; index++) {
      await expect(serviceRunner(index)).rejects.toThrow(InvalidArgumentError)
    }
  })
})
