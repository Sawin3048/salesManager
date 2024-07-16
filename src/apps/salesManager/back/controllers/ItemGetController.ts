import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { ItemFinder } from '../../../../Contexts/Items/application/searchAll/ItemFinder'
import { PrismaItemRepository } from '../../../../Contexts/Items/infraestructure/persistance/PrismaItemRepository'
import { DomainError } from '../../../../Contexts/Shared/domain/DomainError'
import { Controller } from './Controller'

export class ItemGetController implements Controller {
  async run(req: Request, res: Response) {
    const repository = new PrismaItemRepository()
    const service = new ItemFinder(repository)

    try {
      const items = (await service.run()).map(item => item.toPrimitives())
      res.json(items)
    } catch (error) {
      if (error instanceof DomainError) res.status(httpStatus.BAD_REQUEST).send(error.message)
      else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        console.log(error)
      }
    }
  }
}
