import { Router } from 'express'
import { UserGetController } from '../controllers/UserGetController'
import { UserGetByIdController } from '../controllers/UserGetByIdController'

export function register(app: Router) {
  const userGetController = new UserGetController()
  const userGetByIdController = new UserGetByIdController()

  app.get('/user/', userGetController.run.bind(userGetController))
  app.get('/user/:id', userGetByIdController.run.bind(userGetByIdController))
}
