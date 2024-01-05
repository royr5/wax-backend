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

export const handlePsql23502: ErrorRequestHandler = (err, _req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "bad request" });
  } else next(err);
};

export const handlePsql23503: ErrorRequestHandler = (err, _req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "not found" });
  } else next(err);
};

export const handle404 = (_req: Request, res: Response) => {
  res.status(404).send({ msg: "incorrect path - path not found" });
};
