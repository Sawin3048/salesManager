import { Request, Response, NextFunction } from 'express'
import { Controller } from './Controller'
import { UserPrismaRepository } from '../../../../Contexts/User/infraestructure/persistence/UserPrismaRepository'
import { UserFinderById } from '../../../../Contexts/User/application/UserFinderById'

export class UserGetByIdController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const repository = new UserPrismaRepository()
    const service = new UserFinderById(repository)

    try {
      const users = await service.run(req.params.id)
      res.send(users)
    } catch (error) {
      next(error)
    }
  }
}
