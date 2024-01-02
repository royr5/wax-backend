import { Router } from "express";
import { getAllMusic } from "../controllers/getAllMusic";

const musicRouter = Router()

musicRouter.route('/').get(getAllMusic)

export default musicRouter