import { Router } from "express";


const authRouter = Router();

authRouter.route("/").post(checkUserCredentials);

export default authRouter;
