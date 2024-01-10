import { Router } from "express";
import { checkUserCredentials } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.route("/").post(checkUserCredentials);

export default authRouter;
