import { Request, Response, NextFunction } from 'express'
import { Controller } from './Controller'
import { UserPrismaRepository } from '../../../../Contexts/User/infraestructure/persistence/UserPrismaRepository'
import { UserFinder } from '../../../../Contexts/User/application/UserFinder'

export class UserGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const repository = new UserPrismaRepository()
    const service = new UserFinder(repository)

    try {
      const users = await service.run()
      res.send(users)
    } catch (error) {
      next(error)
    }
  }
}
