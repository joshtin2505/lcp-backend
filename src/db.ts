import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'casitadepapel',
  password: 'password',
  port: 5432
})
export default pool
