import { prisma } from '../../../Shared/infraestructure/persistence/prisma/db'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'

export class UserPrismaRepository implements UserRepository {
  async save(user: User) {
    await prisma.user.create({
      data: {
        id: user.id.value,
        name: user.name.value,
        lastname: user.lastname.value,
        cin: user.cin.value,
        role: user.password.value,
        password: user.password.value
      }
    })
  }

  async searchAll() {
    const rowData = await prisma.user.findMany()
    return rowData.map(user => User.fromPrimitives(user))
  }
}
