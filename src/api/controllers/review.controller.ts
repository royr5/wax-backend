import { NextFunction, Request, Response } from "express";
import { selectReviews } from "../models/review.models";

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
