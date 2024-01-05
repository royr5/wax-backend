import { ErrorRequestHandler } from 'express'
import { NextFunction, Response, Request } from "express"

export const customError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg })
  } else next(err)
}

export const handle404 = (req: Request, res: Response) => {
  res.status(404).send({ msg: 'incorrect path - path not found' })
}

