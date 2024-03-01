/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
    if (error) {
      res.status(404).json(error)
    }
    res.status(200).json(result?.rows)
  })
}
function getProductsById(req: Request, res: Response) {
  const { productId } = req.params
  pool.query(
    'SELECT * FROM products WHERE product_id = $1',
    [productId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(200).json(result?.rows)
    }
  )
}
function addProduct(req: Request, res: Response) {
  const { name, description, price, stock, categoryId, imgUrl } = req.body
  pool.query(
    `INSERT INTO products (name, description, price, stock, category_id, img_url) 
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [name, description, price, stock, categoryId, imgUrl],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result?.rows)
    }
  )
}
function updateProduct(req: Request, res: Response) {
  const { name, description, price, stock, categoryId, imgUrl, productId } =
    req.body
  pool.query(
    `UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category_id = $5, img_url = $6 WHERE product_id = $7`,
    [name, description, price, stock, categoryId, imgUrl, productId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result?.rows)
    }
  )
}
function deleteProduct(req: Request, res: Response) {
  const { productId } = req.params
  pool.query(
    'DELETE FROM products WHERE product_id = $1',
    [productId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result?.rows)
    }
  )
}
export {
  productsRoutes,
  getAllProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProduct
}
