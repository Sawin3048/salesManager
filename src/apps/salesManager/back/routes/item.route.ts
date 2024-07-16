import { Router } from 'express'
import { ItemPostController } from '../controllers/ItemPostController'
import { ItemGetController } from '../controllers/ItemGetController'

export function register(app: Router) {
  const itemPostController = new ItemPostController()
  const itemGetController = new ItemGetController()

  app.get('/item', itemGetController.run.bind(itemGetController))
  app.post('/item', itemPostController.run.bind(itemPostController))
}
