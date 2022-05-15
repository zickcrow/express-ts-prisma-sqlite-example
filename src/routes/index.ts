import express, { Router, Request, Response } from 'express'
import posts from './posts'
import users from './users'

const routes: Router = express.Router()
const port: string | undefined = process.env.PORT

routes.use('/posts', posts)
routes.use('/users', users)

routes.get('/', (req: Request, res: Response) => {
  res.send(`[server] 🚀 listening on port http://localhost:${port}`)
})

export default routes