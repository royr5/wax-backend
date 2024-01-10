import { Router } from "express";
import { getSearchedMusic } from "../controllers/search.controller";

const searchRouter = Router();

searchRouter.route("/").get(getSearchedMusic);

export default searchRouter;
