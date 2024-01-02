import { NextFunction, Request, Response } from "express";

export const getReviewsById = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
    const { music_id } = req.query;
    

};
