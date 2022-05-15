import app from './config/app'
import dotenv from 'dotenv'
import logger from './config/logger'

dotenv.config()

const port: string | undefined = process.env.PORT

app.listen(port, () => logger.info(`[server] 🚀 listening on port http://localhost:${port}`))

export default app