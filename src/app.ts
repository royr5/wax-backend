import express from "express";
import apiRouter from "./api/routes/api.router";
import reviewRouter from "./api/routes/review.router";
import loginRouter from "./api/routes/login.router";
import musicRouter from "./api/routes/music.router";
import {
  handle404,
  handleCustomError,
  handlePsql23502,
  handlePsql23503,
} from "./errors";
import serverless from "serverless-http";
import searchRouter from "./api/routes/search.router";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/music", musicRouter);

app.use("/api/reviews", reviewRouter);

app.use("/api/spotify", loginRouter);

app.use("/api/search", searchRouter);

app.use(handleCustomError);

app.use(handlePsql23502);

app.use(handlePsql23503);

app.all("*", handle404);

export const handler = serverless(app);

export default app;
