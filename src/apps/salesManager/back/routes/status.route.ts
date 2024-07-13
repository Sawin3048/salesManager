import { Router } from 'express'
import StatusGetController from '../controllers/StatusGetController'

export function register(app: Router) {
  const controller = new StatusGetController()
  app.get('/status', controller.run.bind(controller))
}
