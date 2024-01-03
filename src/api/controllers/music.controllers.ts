import { NextFunction, Response, Request } from "express"
import { selectAllMusic } from "../models/music.models"

export const getAllMusic = (req: Request, res: Response, next: NextFunction) : void => {
    selectAllMusic(req.query)
    .then((music) => {
        res.status(200).send({music})
    })
}