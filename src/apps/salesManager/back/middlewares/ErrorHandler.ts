import e, { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { InvalidArgumentError } from '../../../../Contexts/Shared/domain/InvalidArgumentError'
import { DomainError } from '../../../../Contexts/Shared/domain/DomainError'
import { InvalidSessionError } from '../../../../Contexts/Session/domain/InvalidSessionError'
import { InvalidAuth } from '../../../../Contexts/User/domain/InvalidAuth'

export function ErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof InvalidArgumentError) {
    res.status(httpStatus.BAD_REQUEST).send(err.message)
    return
  }
  if (err instanceof InvalidSessionError) {
    res.sendStatus(httpStatus.UNAUTHORIZED)
    return
  }
  if (err instanceof InvalidAuth) {
    res.sendStatus(httpStatus.FORBIDDEN)
    return
  }
  if (err instanceof DomainError) {
    res.status(httpStatus.CONFLICT).send(err.message)
    return
  }
  if (err instanceof Error) {
    console.log(err)
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}
