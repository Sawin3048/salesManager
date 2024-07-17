import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { InvalidArgumentError } from '../../../../Contexts/Shared/domain/InvalidArgumentError'

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof InvalidArgumentError) {
    res.status(httpStatus.BAD_REQUEST).send(err.message)
    return
  }
  if (err instanceof Error) {
    console.log(err)
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}
