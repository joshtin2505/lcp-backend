/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'
import type { Id } from '../types/user.types'

function orderRoutes(req: Request, res: Response) {
  res.json({
    message: 'Order routes',
    routes: {
      all: '/order/all',
      getById: '/order/:orderId',
      add: '/order/add',
      update: '/order/update',
      delete: '/order/delete/:orderId'
    }
  })
}

function getAllOrders(_req: Request, res: Response) {
  pool.query(`SELECT * FROM orders`, (error, result) => {
    if (error) {
      res.status(404).json(error)
      return
    } else if (result.rowCount === 0) {
      res.status(404).json({ message: 'No orders' })
      return
    }
    res.status(200).json(result.rows)
  })
}

function getOrderById(req: Request, res: Response) {
  const { orderId } = req.params
  pool.query(
    `SELECT * FROM orders WHERE order_id = $1`,
    [orderId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      } else if (result.rowCount === 0) {
        res.status(404).json({ message: 'No orders' })
        return
      }
      res.status(200).json(result.rows)
    }
  )
}

function addOrder(req: Request, res: Response) {
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
    'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3)',
    [userId, productId, quantity],
    (error, _result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res.status(201).json({ message: 'Order added' })
    }
  )
}

function updateOrder(req: Request, res: Response) {
  const {
    orderId,
    userId,
    productId,
    quantity
  }: {
    orderId: Id
    userId: Id
    productId: Id
    quantity: Id
  } = req.body
  pool.query(
    'UPDATE orders SET user_id = $1, product_id = $2, quantity = $3 WHERE order_id = $4',
    [userId, productId, quantity, orderId],
    (error, _result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res.status(200).json({ message: 'Order updated' })
    }
  )
}

export { orderRoutes, getAllOrders, getOrderById, addOrder, updateOrder }
