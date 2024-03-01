/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'

function productCategoriesRoutes(_req: Request, res: Response) {
  res.json({
    message: 'productCategories Endpoints',
    entpoints: {
      all: '/productCategories/all',
      getById: '/productCategories/:categoryId',
      add: '/productCategories/add',
      update: '/productCategories/update',
      delete: '/productCategories/delete/:categoryId'
    }
  })
}
function getAllProductCategories(_req: Request, res: Response) {
  pool.query('SELECT * FROM product_categories', (error, result) => {
    if (error) {
      res.status(404).json(error)
    }
    res.status(200).json(result?.rows)
  })
}
function getProductCategoriesById(req: Request, res: Response) {
  const { categoryId } = req.params
  pool.query(
    'SELECT * FROM product_categories WHERE category_id = $1',
    [categoryId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(200).json(result?.rows)
    }
  )
}
function addProductCategory(req: Request, res: Response) {
  const { name, description } = req.body
  pool.query(
    `INSERT INTO product_categories (name, description) 
    VALUES ($1, $2)`,
    [name, description],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result?.rows)
    }
  )
}

function updateProductCategory(req: Request, res: Response) {
  const { name, description, categoryId } = req.body
  pool.query(
    `UPDATE product_categories SET name = $1, description = $2 WHERE category_id = $3`,
    [name, description, categoryId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result?.rows)
    }
  )
}

function deleteProductCategory(req: Request, res: Response) {
  const { categoryId } = req.params
  pool.query(
    'DELETE FROM product_categories WHERE category_id = $1',
    [categoryId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result?.rows)
    }
  )
}

export {
  productCategoriesRoutes,
  getAllProductCategories,
  getProductCategoriesById,
  addProductCategory,
  updateProductCategory,
  deleteProductCategory
}
