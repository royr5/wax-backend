import { ErrorRequestHandler } from "express";
import { NextFunction, Response, Request } from "express";

export const handleCustomError: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

export const handlePsqlErrors: ErrorRequestHandler = (err, _req, res, next) => {
  switch (err.code) {
    case "22P02":
    case "23502":
      res.status(400).send({ msg: "bad request" });
      break;
    case "23503":
      res.status(404).send({ msg: "not found" });
      break;
    default:
      next(err);
      break;
  }
};

export const handle404 = (_req: Request, res: Response) => {
  res.status(404).send({ msg: "incorrect path - path not found" });
};

export const handleServerErrors: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
};
