import { Request, Response, NextFunction } from 'express'
import { Controller } from './Controller'
import { UserFinderById } from '../../../../Contexts/User/application/UserFinderById'
import { container, containerKeys } from '../dependency-injection'

export class UserGetByIdController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const service = container.resolve<UserFinderById>(containerKeys.user.finderById)

    try {
      const user = await service.run(req.params.id)
      res.send(user)
    } catch (error) {
      next(error)
    }
  }
}
