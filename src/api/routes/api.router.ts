import { Router } from "express";
import musicRouter from "./music.router";

const apiRouter = Router();

apiRouter.use('/music', musicRouter)

export default apiRouter;
