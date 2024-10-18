import { NextFunction, Request, Response } from 'express'
import { SalesCreator } from '../../../../Contexts/Sale/application/SaleCreator'
import { container, containerKeys } from '../dependency-injection'
import httpStatus from 'http-status'

export class SalePostController {
  async run(req: Request, res: Response, next: NextFunction) {
    const data = req.body

    const saleCreator = container.resolve<SalesCreator>(containerKeys.sale.creator)

    try {
      await saleCreator.run(data)
      res.sendStatus(httpStatus.CREATED)
    } catch (err) {
      next(err)
    }
  }
}
