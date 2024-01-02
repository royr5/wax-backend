import express from "express";
import apiRouter from "./api/routes/api.router";

const app = express();

app.use(express.json());
app.use("/", apiRouter);

export default app;
