import express from "express";
import apiRouter from "./api/routes/api.router";
import reviewRouter from "./api/routes/review.router";
import loginRouter from "./api/routes/login.router";
import musicRouter from './api/routes/music.router'
import {handle404} from './errors'

const app = express()

app.use(express.json())
app.use('/api', apiRouter)
app.use('/api/music', musicRouter)


app.use("/api/reviews", reviewRouter);

app.use("/api/login", loginRouter);

app.all('*', handle404)

export default app
