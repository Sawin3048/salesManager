import { Request, Response, NextFunction } from 'express'
import { Controller } from './Controller'
import { container, containerKeys } from '../dependency-injection'
import { UserCreator } from '../../../../Contexts/User/application/UserCreator'
import httpStatus from 'http-status'
import { EntityAlreadyExists } from '../../../../Contexts/Customer/infraestructure/EntityAlreadyExist'

export class UserPostController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const service = container.resolve<UserCreator>(containerKeys.user.creator)
    const { cin, id, name, lastname, role, password } = req.body

    try {
      await service.run({ cin, id, lastname, name, password, role })
      res.sendStatus(httpStatus.CREATED)
    } catch (error) {
      if (error instanceof EntityAlreadyExists) res.status(httpStatus.CONFLICT).send('User already exists')
      else next(error)
    }
  }
}
