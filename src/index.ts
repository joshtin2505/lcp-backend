import app, { LOCAL_PORT } from './app'
import { dbConect } from './db'

app.listen(LOCAL_PORT, () => {
  const PORT = process.env.PORT ?? LOCAL_PORT
  dbConect(PORT)
})
