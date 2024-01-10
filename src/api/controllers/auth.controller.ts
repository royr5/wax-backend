import { NextFunction, Request, Response } from "express";
import { authenticateUser } from "../models/auth.model";

export const checkUserCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { username, password },
    } = req;
    const areValidCredentials = await authenticateUser(username, password);
    res.status(200).send({ areValidCredentials });
  } catch (err) {
    next(err);
  }
};