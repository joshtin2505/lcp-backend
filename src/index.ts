import app, { PORT } from './app'
import { dbConect } from './db'

app.listen(PORT, () => {
  dbConect(PORT)
})
