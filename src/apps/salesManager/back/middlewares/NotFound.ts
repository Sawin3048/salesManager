import { Request, Response } from 'express'
import httpStatus from 'http-status'
import path from 'path'

export function NotFound(req: Request, res: Response) {
  res.status(httpStatus.NOT_FOUND).sendFile(path.join(__dirname, '404.html'))
}
