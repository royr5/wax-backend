import { Router } from "express";

const reviewRouter = Router();

reviewRouter.route("/:music_id").get()

export default reviewRouter