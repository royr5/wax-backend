import express from "express";
import apiRouter from "./api/routes/api.router";
import reviewRouter from "./api/routes/review.router";
import loginRouter from "./api/routes/login.router";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/reviews", reviewRouter);

app.use("/api/login", loginRouter);

export default app;
