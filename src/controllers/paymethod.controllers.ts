/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'

function payMethodRoutes(_req: Request, res: Response) {
  res.json({
    message: 'PayMethod Endpoints',
    entpoints: {
      all: '/paymethod/all',
      getById: '/paymethod/:payMethodId',
      add: '/paymethod/add',
      update: '/paymethod/update',
      delete: '/paymethod/delete/:payMethodId'
    }
  })
}

function getAllPayMethods(_req: Request, res: Response) {
  pool.query('SELECT * FROM paymethod', (error, result) => {
    if (error) {
      res.status(404).json(error)
      return
    } else if (result.rowCount === 0) {
      res.status(404).json({ message: 'No hay metodos de pago' })
      return
    }
    res.status(200).json(result.rows)
  })
}

function getPayMethodById(req: Request, res: Response) {
  const { payMethodId } = req.params
  pool.query(
    'SELECT * FROM paymethod WHERE paymethod_id = $1',
    [payMethodId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      } else if (result.rowCount === 0) {
        res.status(404).json({ message: 'No hay metodos de pago' })
        return
      }
      res.status(200).json(result.rows)
    }
  )
}

function addPayMethod(req: Request, res: Response) {
  const {
    methodName,
    userId,
    cartNumber,
    expirationDate,
    cvv,
    cartType,
    issuingBank,
    issuingCountry,
    cartStatus
  } = req.body
  pool.query(
    'INSERT INTO paymethod (method_name, user_id, cart_numbrer, expiration_date, cvv, cart_type, issuing_bank, issuing_country, cart_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [
      methodName,
      userId,
      cartNumber,
      expirationDate,
      cvv,
      cartType,
      issuingBank,
      issuingCountry,
      cartStatus
    ],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res
        .status(201)
        .json({ message: 'Metodo de pago agregado', result: result.rows })
    }
  )
}

function updatePayMethod(req: Request, res: Response) {
  const {
    methodName,
    userId,
    cartNumber,
    expirationDate,
    cvv,
    cartType,
    issuingBank,
    issuingCountry,
    cartStatus,
    payMethodId
  } = req.body
  pool.query(
    'UPDATE paymethod SET method_name = $1, cart_numbrer = $3, expiration_date = $4, cvv = $5, cart_type = $6, issuing_bank = $7, issuing_country = $8, cart_status = $9 WHERE paymethod_id = $10 AND user_id = $2',
    [
      methodName,
      userId,
      cartNumber,
      expirationDate,
      cvv,
      cartType,
      issuingBank,
      issuingCountry,
      cartStatus,
      payMethodId
    ],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res
        .status(201)
        .json({ message: 'Metodo de pago actualizado', result: result.rows })
    }
  )
}

function deletePayMethod(req: Request, res: Response) {
  const { payMethodId } = req.params
  pool.query(
    'DELETE FROM paymethod WHERE paymethod_id = $1',
    [payMethodId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      }
      res
        .status(201)
        .json({ message: 'Metodo de pago eliminado', result: result.rows })
    }
  )
}

export {
  payMethodRoutes,
  getAllPayMethods,
  getPayMethodById,
  addPayMethod,
  updatePayMethod,
  deletePayMethod
}
