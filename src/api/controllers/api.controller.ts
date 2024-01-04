import { NextFunction, Request, Response } from "express";

export default (_req: Request, res: Response, _next: NextFunction): void => {
res.status(200).send({msg: "ok"})
}