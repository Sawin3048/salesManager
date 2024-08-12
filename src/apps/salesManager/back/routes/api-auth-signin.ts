import { NextFunction, Router, Request, Response } from 'express'
import httpStatus from 'http-status'
import { SessionGenerator } from '../../../../Contexts/Session/application/SessionGenerator'
import { UserPasswordValidator } from '../../../../Contexts/User/application/UserPasswordValidator'
import { container, containerKeys } from '../dependency-injection'

export function register(router: Router) {
  router.post('/api/signin', (req: Request, res: Response, next: NextFunction) => {
    const { cin, password } = req.body

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!cin || !password) res.sendStatus(httpStatus.BAD_REQUEST)
    const sessionCreator = container.resolve<SessionGenerator>(containerKeys.session.generator)
    const isValidUser = container.resolve<UserPasswordValidator>(containerKeys.session.validator)

    // const session = sessionCreator.run('')
  })
}
