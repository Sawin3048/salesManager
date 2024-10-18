import { NextFunction, Router, Request, Response } from 'express'
import { container, containerKeys } from '../dependency-injection'
import { SessionGenerator } from '../../../../Contexts/Session/application/SessionGenerator'
import { UserPasswordValidator } from '../../../../Contexts/User/application/UserPasswordValidator'
import httpStatus from 'http-status'

export function register(router: Router) {
  router.post('/api/signin', async (req: Request, res: Response, next: NextFunction) => {
    const { cin, password } = req.body

    const sessionCreator = container.resolve<SessionGenerator>(containerKeys.session.generator)
    const userValidator = container.resolve<UserPasswordValidator>(containerKeys.user.passwordValidator)

    try {
      const userId = await userValidator.run(cin, password)
      console.log({ userId })
      const session = await sessionCreator.run(userId.value)
      res.cookie('Authorization', session, { httpOnly: true })
      res.sendStatus(httpStatus.OK)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
}
