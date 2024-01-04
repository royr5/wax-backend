import { NextFunction, Request, Response } from "express";
import { selectReviews } from "../models/review.models";

export const getReviewsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { music_id } = req.params;

  try {
    //  TODO
    //? const reviews = await selectReviews(music_id);
    // res.status(200).send({ reviews });

    res.status(200).send({
      reviews: [
        {
          music_id: 1,
          user_id: 2,
          score: 2,
          title: "string",
          body: "string",
          created_at: "string",
        },
      ],
    });
  } catch (err) {
    next(err);
  }
};

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //  TODO
    //? const reviews = await selectReviews();
    // res.status(200).send({ reviews });

    res.status(200).send({
      reviews: [
        {
          music_id: 1,
          user_id: 2,
          score: 2,
          title: "string",
          body: "string",
          created_at: "string",
        },
      ],
    });
  } catch (err) {
    next(err);
  }
};
