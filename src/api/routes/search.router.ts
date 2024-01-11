import { Router } from "express";
import { getSearchedMusic } from "../controllers/search.controller";

const searchRouter = Router();

searchRouter.route("/").post(getSearchedMusic);

export default searchRouter;
