import express from "express";
import apiRouter from "./api/routes/api.router";
import musicRouter from "./api/routes/music.router";

const app = express();

app.use(express.json());
app.use("/api", apiRouter);
apiRouter.use('/api/music', musicRouter)

export default app;
