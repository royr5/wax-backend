import { Router } from "express";
import { spotifyAccess, spotifyAuth } from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.route("/").get(spotifyAuth);
loginRouter.route("/callback").get(spotifyAccess);

export default loginRouter;
