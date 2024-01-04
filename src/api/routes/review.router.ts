import { Router } from "express";
import {
  getAllReviews,
  getReviewsById,
} from "../controllers/review.controller";

const reviewRouter = Router();

reviewRouter.route("/").get(getAllReviews);
reviewRouter.route("/:music_id").get(getReviewsById);

export default reviewRouter;
