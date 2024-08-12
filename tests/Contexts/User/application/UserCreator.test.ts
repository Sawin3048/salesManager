import { UserCreator } from '../../../../src/Contexts/User/application/UserCreator'
import { HasherMock } from '../__mocks__/HasherMock'
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock'
import { UserMother } from '../domain/UserMother'

describe('User creator', () => {
  it('Create an user', async () => {
    const user = UserMother.random()
    const repository = new UserRepositoryMock()
    const hasher = new HasherMock()
    const service = new UserCreator({ stringHasher: hasher, userRepository: repository })
    const primitives = user.toPrimitives()

    await service.run({
      ...primitives
    })

    repository.assertSaveHasBeenCalledWith(user)
    hasher.assertHashHasBeenCalledWith(user.password.value)
  })
})
