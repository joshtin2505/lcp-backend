import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import usersRoutes from './routes/users.routes'
const app = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Routes
// -------
app.get('/', (_req, res) => {
  res.json({
    message: 'ROOT',
    entpoints: {
      root: '/'
    }
  })
})
app.use('/users', usersRoutes)

app.use(function (_req, res, _next) {
  res.status(404).json({
    message: 'Not Found',
    entpoints: {
      root: '/'
    }
  })
})

export const LOCAL_PORT = 3000
export default app
