import { NextFunction, Request, Response } from "express";
import { insertReview, selectReviews } from "../models/review.models";
import { errorMonitor } from "stream";

export const getReviewsById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { music_id } = req.params;

  try {
    const reviews = await selectReviews(music_id);
    res.status(200).send({ reviews });
  } catch (err) {
    next(err);
  }
};

export const getAllReviews = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reviews = await selectReviews();
    res.status(200).send({ reviews });
  } catch (err) {
    next(err);
  }
};

export const postReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      body: { username, rating, review_title, review_body },
      params: { music_id },
    } = req;

    const review = await insertReview(
      music_id,
      username,
      rating,
      review_title,
      review_body
    );
    res.status(201).send({ review });
  } catch (err) {
    next(err);
  }
};
