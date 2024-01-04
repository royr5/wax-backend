import { Router } from "express";
import { getAllMusic } from "../controllers/music.controllers";

const musicRouter = Router()

musicRouter.route('/').get(getAllMusic)

export default musicRouter