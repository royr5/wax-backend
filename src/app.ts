import express from "express";
import apiRouter from "./api/routes/api.router";
import reviewRouter from "./api/routes/review.router";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use ("api/reviews", reviewRouter)

export default app;
