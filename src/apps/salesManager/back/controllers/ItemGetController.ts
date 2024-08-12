import { NextFunction, Request, Response } from 'express'
import { ItemFinder } from '../../../../Contexts/Items/application/searchAll/ItemFinder'
import { Controller } from './Controller'
import { container, containerKeys } from '../dependency-injection'

export class ItemGetController implements Controller {
  async run(req: Request, res: Response, next: NextFunction) {
    const service = container.resolve<ItemFinder>(containerKeys.item.finder)
    try {
      const items = (await service.run()).map(item => item.toPrimitives())
      res.json(items)
    } catch (error) {
      next(error)
    }
  }
}
