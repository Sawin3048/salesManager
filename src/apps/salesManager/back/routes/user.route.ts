import { Router } from 'express'
import { UserGetController } from '../controllers/UserGetController'
import { UserGetByIdController } from '../controllers/UserGetByIdController'
import { UserPostController } from '../controllers/UserPostController'

export function register(app: Router) {
  const userGetController = new UserGetController()
  const userGetByIdController = new UserGetByIdController()
  const userPostController = new UserPostController()

  app.get('/user/', userGetController.run.bind(userGetController))
  app.get('/user/:id', userGetByIdController.run.bind(userGetByIdController))
  app.post('/user', userPostController.run.bind(userPostController))
}
