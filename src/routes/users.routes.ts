import { Router } from 'express'
import pool from '../db'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    message: 'Users Endpoints',
    entpoints: {
      all: '/users/all'
    }
  })
})
router.get('/all', (_req, res) => {
  pool.query('SELECT * FROM users', (error, result) => {
    // if (error) {
    //   throw error
    // }
    if (result === undefined) {
      res.status(404).json({ message: 'Err', error })
    }
    res.status(200).json(result.rows)
  })
})

export default router
