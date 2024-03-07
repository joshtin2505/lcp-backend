/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'

function cartRoutes(_req: Request, res: Response) {
  res.json({
    message: 'Cart Endpoints',
    entpoints: {
      all: '/cart/all',
      getById: '/cart/:cartId',
      add: '/cart/add',
      update: '/cart/update',
      delete: '/cart/delete/:cartId'
    }
  })
}

function getAllCarts(_req: Request, res: Response) {
  pool.query('SELECT * FROM cart', (error, result) => {
    if (error) {
      res.status(404).json(error)
      return
    } else if (result.rowCount === 0) {
      res.status(404).json({ message: 'No hay carritos' })
      return
    }
    res.status(200).json(result.rows)
  })
}

export { cartRoutes, getAllCarts }
