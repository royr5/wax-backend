import { ErrorRequestHandler } from 'express'

const customError: ErrorRequestHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg })
  } else next(err)
}

export default customError
