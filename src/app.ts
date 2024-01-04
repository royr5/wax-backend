import express, { Response, Request } from 'express'
import apiRouter from './api/routes/api.router'
import musicRouter from './api/routes/music.router'

const app = express()

app.use(express.json())
app.use('/api', apiRouter)
app.use('/api/music', musicRouter)

// app.all('*', (req: Request, res: Response) => {
//   res.status(404).send({ msg: 'incorrect path - path not found' })
// })

export default app
