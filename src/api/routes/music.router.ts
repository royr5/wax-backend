import { Router } from "express";
import { addMusic, getAllMusic } from "../controllers/music.controllers";

const musicRouter = Router()

musicRouter.route('/').get(getAllMusic).post(addMusic)

export default musicRouter