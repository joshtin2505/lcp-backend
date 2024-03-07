/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'
import type { Id } from '../types/user.types'

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
function getAllItemsInCarts(req: Request, res: Response) {
  // get Cart by user id
  const { userId } = req.body
  pool.query(
    'SELECT * FROM cart WHERE user_id = $1 INNER JOIN cart_items ON cart.cart_id = cart_items.cart_id',
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

// function addItemToCart(req: Request, res: Response) {
//   const { }: {
//     productId: Id
//     quantity: Id
//   } = req.body
//   pool.query(
//     'INSERT INTO cart_itmes () VALUES ($1, $2, $3)',
//     [productId, quantity],
//     (error, result) => {
//       if (error) {
//         res.status(404).json(error)
//         return
//       }
//       res.status(201).json(result)
//     }
//   )
// }

function updateCart(req: Request, res: Response) {
  const {
    userId,
    productId,
    quantity
  }: {
    userId: Id
    productId: Id
    quantity: Id
  } = req.body
  pool.query(
    'UPDATE cart SET user_id = $1, product_id = $2, quantity = $3',
    [userId, productId, quantity],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res.status(201).json(result)
    }
  )
}

export { cartRoutes, updateCart, getAllItemsInCarts }
