import type { Request, Response } from 'express'
import pool from '../db'

function usersRoutes(_req: Request, res: Response) {
  res.json({
    message: 'Users Endpoints',
    entpoints: {
      all: '/users/all'
    }
  })
}
function getAllUsers(_req: Request, res: Response) {
  pool.query('SELECT * FROM users', (error, result) => {
    if (result === undefined) {
      res.status(404).json(error)
    }
    res.status(200).json(result?.rows)
  })
}
function getUserById(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
    if (result === undefined) {
      res.status(404).json(error)
    }
    res.status(200).json(result?.rows)
  })
}
export { usersRoutes, getAllUsers, getUserById }
