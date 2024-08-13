import { prisma } from '../../../Shared/infraestructure/persistence/prisma/db'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { UserId } from '../../domain/UserId'
import { UserCin } from '../../domain/UserCin'

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

  async search(userId: UserId) {
    const rawData = await prisma.user.findFirst({
      where: {
        id: userId.value
      }
    })

    if (rawData == null) return null
    return User.fromPrimitives(rawData)
  }

  async searchByCin(cin: UserCin) {
    const data = await prisma.user.findFirst({ where: { cin: cin.value } })
    if (data == null) return null
    return User.fromPrimitives(data)
  }

  async searchAll() {
    const rowData = await prisma.user.findMany()
    return rowData.map(user => User.fromPrimitives(user))
  }
}
