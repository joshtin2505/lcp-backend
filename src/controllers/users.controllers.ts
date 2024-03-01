/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'

function usersRoutes(_req: Request, res: Response) {
  res.json({
    message: 'Users Endpoints',
    entpoints: {
      all: '/users/all',
      getById: '/users/:userId',
      add: '/users/add',
      update: '/users/update',
      delete: '/users/delete/:userId'
    }
  })
}
function getAllUsers(_req: Request, res: Response) {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) {
      res.status(404).json(error)
      return
    } else if (result.rowCount === 0) {
      res.status(404).json({ message: 'No hay usuarios' })
      return
    }
    res.status(200).json(result.rows)
  })
}
function getUserById(req: Request, res: Response) {
  const id = req.params.userId
  pool.query(
    'SELECT * FROM users WHERE user_id = $1',
    [id],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(200).json(result?.rows)
    }
  )
}
function addUser(req: Request, res: Response) {
  const { name, email, lastName, password, role } = req.body
  pool.query(
    `INSERT INTO users (name, lastName, email, password, role) 
    VALUES ($1, $2, $3, $4, $5)`,
    [name, lastName, email, password, role],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result.rows)
    }
  )
}
function updateUser(req: Request, res: Response) {
  const { name, email, lastName, password, role, phone, phonePrefix, userId } =
    req.body
  pool.query(
    `UPDATE users SET name = $1, lastName = $2, email = $3, password = $4, role = $5, phone = $6, phonePrefix = $7 WHERE user_id = $8`,
    [name, lastName, email, password, role, phone, phonePrefix, userId],
    (error, result: any) => {
      if (result === undefined) {
        res.status(404).json(error)
      }
      res.status(201).json(result.rows)
    }
  )
}
function deleteUser(req: Request, res: Response) {
  const id = req.params.userId
  pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, result) => {
    if (error) {
      res.status(404).json(error)
      return
    }
    res.status(201).json(result.rows)
  })
}
export {
  usersRoutes,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
}
