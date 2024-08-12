import httpStatus from 'http-status'
import { Controller } from './Controller'
import { NextFunction, Request, Response } from 'express'
import { ItemCreator } from '../../../../Contexts/Items/application/Create/ItemCreator'
import { container, containerKeys } from '../dependency-injection'

export class ItemPostController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const {
      code,
      description,
      saleType,
      basePrice,
      unitaryPrice,
      wholesalePrice,
      stock
    } = req.body
    const service = container.resolve<ItemCreator>(containerKeys.item.creator)

    const price = {
      basePrice,
      unitaryPrice,
      wholesalePrice
    }

    try {
      await service.run(
        code,
        description,
        saleType,
        price,
        stock
      )
      res.sendStatus(httpStatus.CREATED)
    } catch (error) {
      next(error)
    }
  }
}
