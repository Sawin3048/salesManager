import httpStatus from 'http-status'
import { Controller } from './Controller'
import { NextFunction, Request, Response } from 'express'
import { ItemCreator } from '../../../../Contexts/Items/application/Create/ItemCreator'
import { PrismaItemRepository } from '../../../../Contexts/Items/infraestructure/persistance/PrismaItemRepository'

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
    const repository = new PrismaItemRepository()
    const service = new ItemCreator(repository)

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
