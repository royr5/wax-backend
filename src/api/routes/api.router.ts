import { Router } from "express";
import healthCheck from "../controllers/api.controller";

const apiRouter = Router();

apiRouter.route("/").get(healthCheck);

export default apiRouter;
