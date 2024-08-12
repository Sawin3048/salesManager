import { Request, Response, NextFunction } from 'express'
import { Controller } from './Controller'
import { UserFinder } from '../../../../Contexts/User/application/UserFinder'
import { container, containerKeys } from '../dependency-injection'

export class UserGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const service = container.resolve<UserFinder>(containerKeys.user.finder)

    try {
      const users = await service.run()
      res.send(users)
    } catch (error) {
      next(error)
    }
  }
}
