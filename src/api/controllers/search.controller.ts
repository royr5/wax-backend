import { NextFunction, Response, Request } from "express";
import { searchSpotify } from "../../utils/api";
import { refreshAccessToken } from "../models/login.models";

export const getSearchedMusic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { q, type } = req.query;

  const { access_token } = await refreshAccessToken(req);

  const matchedMusic = await searchSpotify(
    access_token,
    q as string,
    type as string
  );

  console.log("🚀 ~ matchedMusic:", matchedMusic!.data);
};
