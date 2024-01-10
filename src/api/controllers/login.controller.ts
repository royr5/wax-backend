import {
  refreshAccessToken,
  requestToken,
  userAuth,
} from "../models/login.models";
import { NextFunction, Request, Response } from "express";

export const spotifyAuth = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userAuth(res);
  } catch (err) {
    next(err);
  }
};

export const spotifyAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await requestToken(req, res);
  } catch (err) {
    throw err;
  }
  res.redirect("http://northcoders.com");
};

export const getAccessToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await refreshAccessToken();
  } catch (err) {
    next(err);
  }
};
