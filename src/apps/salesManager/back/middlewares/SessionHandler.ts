import { NextFunction, Request, Response } from 'express'
import { SessionValidator } from '../../../../Contexts/Session/application/SessionValidator'
import { SessionHandlerWithJWT } from '../../../../Contexts/Session/infraestructure/SessionHandlerWithJWT'

export async function SessionHandler(req: Request, res: Response, next: NextFunction) {
  const session = req.headers.authorization as string

  const sessionHandler = new SessionHandlerWithJWT('alksjdlfjaslkdfj', '1d')
  const verify = new SessionValidator(sessionHandler)

  try {
    const { userId } = await verify.run(session)
    res.locals.user = { id: userId }
    if (userId != null) next()
  } catch (error) {
    next(error)
  }
}
