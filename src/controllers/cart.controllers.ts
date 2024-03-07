/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'
import type { Id } from '../types/user.types'

function cartRoutes(_req: Request, res: Response) {
  res.json({
    message: 'Cart Endpoints',
    entpoints: {
      all: '/cart/all',
      add: '/cart/add',
      update: '/cart/update',
      delete: '/cart/delete/:cartId'
    }
  })
}
function getAllItemsInCart(req: Request, res: Response) {
  const { userId } = req.body
  pool.query(
    `SELECT products.* 
    FROM cart 
    INNER JOIN cart_items ON cart.cart_id = cart_items.cart_id
    INNER JOIN products ON cart_items.product_id = products.product_id
    WHERE user_id = $1 
    `, // Test this query
    [userId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      } else if (result.rowCount === 0) {
        res.status(404).json({ message: 'No hay carrito' })
        return
      }
      res.status(200).json(result.rows)
    }
  )
}

function addItemToCart(req: Request, res: Response) {
  const {
    productId,
    quantity
  }: {
    productId: Id
    quantity: number
  } = req.body
  pool.query(
    'INSERT INTO cart_itmes (product_id, quantity) VALUES ($1, $2)',
    [productId, quantity],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res.status(201).json(result)
    }
  )
}

function modifyQuantityProduct(req: Request, res: Response) {
  const {
    cartItmeId,
    productId,
    quantity
  }: {
    cartItmeId: Id
    productId: Id
    quantity: Id
  } = req.body

  pool.query(
    'UPDATE cart_items WHERE cart_itme_id = $1 SET product_id = $2, quantity = $3',
    [cartItmeId, productId, quantity],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res.status(201).json(result)
    }
  )
}

function deleteItemFromCart(req: Request, res: Response) {
  const { cartItemId } = req.params
  pool.query(
    'DELETE FROM cart_items WHERE cart_itme_id = $1',
    [cartItemId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res.status(200).json(result)
    }
  )
}

export {
  cartRoutes,
  getAllItemsInCart,
  addItemToCart,
  modifyQuantityProduct,
  deleteItemFromCart
}
