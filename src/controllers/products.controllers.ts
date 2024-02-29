import type { Request, Response } from 'express'
import pool from '../db'

function productsRoutes(_req: Request, res: Response) {
  res.json({
    message: 'products Endpoints',
    entpoints: {
      all: '/products/all'
    }
  })
}
function getAllProducts(_req: Request, res: Response) {
  pool.query('SELECT * FROM products', (error, result) => {
    if (result === undefined) {
      res.status(404).json(error)
    }
    res.status(200).json(result?.rows)
  })
}
function getProductsById(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  pool.query('SELECT * FROM products WHERE id = $1', [id], (error, result) => {
    if (result === undefined) {
      res.status(404).json(error)
    }
    res.status(200).json(result?.rows)
  })
}
export { productsRoutes, getAllProducts, getProductsById }
