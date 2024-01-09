import { Router } from "express";
import { getAccessToken, spotifyAccess, spotifyAuth } from "../controllers/login.controller";

const loginRouter = Router();

loginRouter.route("/login").get(spotifyAuth);
loginRouter.route("/login/callback").get(spotifyAccess);
loginRouter.route("/refresh_token").get(getAccessToken)

export default loginRouter;
