import { NextFunction, Request, Response } from 'express'
import { ItemFinder } from '../../../../Contexts/Items/application/searchAll/ItemFinder'
import { PrismaItemRepository } from '../../../../Contexts/Items/infraestructure/persistance/PrismaItemRepository'
import { Controller } from './Controller'

export class ItemGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const repository = new PrismaItemRepository()
    const service = new ItemFinder(repository)
    console.log(res.locals.user)
    try {
      const items = (await service.run()).map(item => item.toPrimitives())
      res.json(items)
    } catch (error) {
      next(error)
    }
  }
}
