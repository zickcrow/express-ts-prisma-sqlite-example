import express, { Express } from 'express'
import cors from 'cors'
import { stream } from './logger'
import morgan from 'morgan'
import routes from '../routes'

const app: Express = express()

app.use(express.json())
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { stream }))
app.use(cors())

app.use('/', routes)

export default app