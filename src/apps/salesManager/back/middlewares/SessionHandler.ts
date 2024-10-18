import { NextFunction, Request, Response } from 'express'
import { SessionValidator } from '../../../../Contexts/Session/application/SessionValidator'
import { container, containerKeys } from '../dependency-injection'

export async function SessionHandler(req: Request, res: Response, next: NextFunction) {
  const session = req.cookies.Authorization

  const verify = container.resolve<SessionValidator>(containerKeys.session.validator)

  try {
    const userId = await verify.run(session)
    res.locals.user = { id: userId }
    if (userId != null) next()
  } catch (error) {
    next(error)
  }
}
