import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { PORT, APP_FRONTEND_URL } from './shared/shared.constants.js'
import { authBearer } from './middlewares/auth.js'
import errorMiddleware from './middlewares/error.js'
import router from './router.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(cookieParser())
app.use(
  cors({
    origin: APP_FRONTEND_URL,
    credentials: true,
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authBearer)
app.use('/api', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
