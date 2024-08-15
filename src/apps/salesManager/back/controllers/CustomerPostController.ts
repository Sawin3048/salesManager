import { NextFunction, Request, Response } from 'express'
import { Controller } from './Controller'
import { container, containerKeys } from '../dependency-injection'
import { CustomerCreator } from '../../../../Contexts/Customer/application/CustomerCreator'
import httpStatus from 'http-status'
import { EntityAlreadyExists } from '../../../../Contexts/Customer/infraestructure/EntityAlreadyExist'

export class CustomerPostController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const customerCreator = container.resolve<CustomerCreator>(containerKeys.customer.creator)
    const { name, lastname, ruc } = req.body

    try {
      await customerCreator.run({ name, lastname, ruc })

      res.sendStatus(httpStatus.CREATED)
    } catch (error) {
      if (error instanceof EntityAlreadyExists) res.status(httpStatus.CONFLICT).send('User already exist')
      else next(error)
    }
  }
}
