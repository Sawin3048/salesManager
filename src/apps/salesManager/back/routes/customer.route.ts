import { Router } from 'express'
import { CustomerPostController } from '../controllers/CustomerPostController'

export function register(app: Router) {
  const customerPostController = new CustomerPostController()
  app.post('/customer', customerPostController.run.bind(customerPostController))
}
