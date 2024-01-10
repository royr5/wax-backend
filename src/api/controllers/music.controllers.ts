import { NextFunction, Response, Request } from "express";
import { insertMusic, selectAllMusic } from "../models/music.models";

export const getAllMusic = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  selectAllMusic(req.query)
    .then((music) => {
      res.status(200).send({ music });
    })
    .catch((err: Error) => {
      next(err);
    });
};

export const addMusic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  try {
    (await insertMusic(body)) && res.status(201).send({ msg: "created" });
  } catch (err) {
    next(err);
  }
};
