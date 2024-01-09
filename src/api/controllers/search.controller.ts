import { NextFunction, Response, Request } from "express";
import { searchSpotify } from "../../utils/api";

export const getSearchedMusic = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.query);
  searchSpotify().then((res) => {
  console.log("🚀 ~ searchSpotify ~ res:", res)
  });
};
