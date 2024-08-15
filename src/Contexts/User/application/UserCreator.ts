import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { StringHasher } from '../../Shared/domain/StringHasher'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { UserUnHashedPassword } from '../domain/UserUnHashedPassword'
import { EntityAlreadyExists } from '../../Customer/infraestructure/EntityAlreadyExist'

export class UserCreator {
  private readonly repository: UserRepository
  private readonly hasher: StringHasher

  constructor(dependencies: {
    userRepository: UserRepository
    stringHasher: StringHasher
  }) {
    this.repository = dependencies.userRepository
    this.hasher = dependencies.stringHasher
  }

  async run(params: {
    id: string
    name: string
    lastname: string
    cin: number
    role: string
    password: string
  }) {
    const { cin, id, lastname, name, password, role } = params
    const user = User.fromPrimitives({
      id,
      name,
      lastname,
      cin,
      role,
      password: await this.hashPassword(new UserUnHashedPassword(password))
    })
    try {
      await this.repository.save(user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') throw new EntityAlreadyExists()
      }
      throw error
    }
  }

  private async hashPassword(password: UserUnHashedPassword) {
    return await this.hasher.hash(password.value)
  }
}
