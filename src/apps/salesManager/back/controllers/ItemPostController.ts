import httpStatus from 'http-status'
import { Controller } from './Controller'
import { Request, Response } from 'express'
import { ItemCreator } from '../../../../Contexts/Items/application/Create/ItemCreator'
import { PrismaItemRepository } from '../../../../Contexts/Items/infraestructure/persistance/PrismaItemRepository'
import { DomainError } from '../../../../Contexts/Shared/domain/DomainError'

export class ItemPostController implements Controller {
  async run(req: Request, res: Response) {
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
      if (error instanceof DomainError) res.status(httpStatus.BAD_REQUEST).send(error.message)
      else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        console.log(error)
      }
    }
  }
}
