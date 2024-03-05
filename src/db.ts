import { Pool } from 'pg'

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'casitadepapel',
//   password: 'password',
//   port: 5432
// })
const pool = new Pool({
  user: 'casitadepapel',
  host: 'dpg-cnjntc21hbls73dqroi0-a',
  database: 'casitadepapel',
  password: '5t2eOI4chqjCQ2quTUHmvFmSN89AGT3J',
  port: 5432
})

export function dbConect(PORT: number) {
  pool
    .connect()
    .then((client) => {
      console.log('connected to database')
      console.log(`Server is running on port http://localhost:${PORT} 🚀`)
      client.release()
    })
    .catch((err) => {
      console.log('error connecting to database', err)
    })
}
export default pool
