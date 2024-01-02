import { Router } from "express";
import { getReviewsById } from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.route("/:music_id").get(getReviewsById);

export default reviewRouter