import express from "express";
import apiRouter from "./api/routes/api.router";
import reviewRouter from "./api/routes/review.router";
import loginRouter from "./api/routes/login.router";
import musicRouter from "./api/routes/music.router";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/music", musicRouter);

app.use("/api/reviews", reviewRouter);

app.use("/api/login", loginRouter);

// app.all('*', (req: Request, res: Response) => {
//   res.status(404).send({ msg: 'incorrect path - path not found' })
// })

export default app;
