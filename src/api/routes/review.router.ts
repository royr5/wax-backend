import { Router } from "express";
import {
  removeReview,
  getAllReviews,
  getReviewsById,
  postReviewById,
} from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.route("/").get(getAllReviews);

reviewRouter.route("/:music_id").get(getReviewsById).post(postReviewById);

reviewRouter.route("/:review_id").delete(removeReview);

export default reviewRouter;
