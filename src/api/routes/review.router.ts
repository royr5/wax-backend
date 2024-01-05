import { Router } from "express";
import {
  getAllReviews,
  getReviewsById,
  postReviewById,
} from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.route("/").get(getAllReviews);
reviewRouter.route("/:music_id").get(getReviewsById).post(postReviewById)

export default reviewRouter;
