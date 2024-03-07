/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'

function addressRoutes(_req: Request, res: Response) {
  res.json({
    message: 'Address Endpoints',
    entpoints: {
      getAllUserAddress: '/address/all',
      getUserAddress: '/address/:addressId',
      addUserAddress: '/address/add',
      updateUserAddress: '/address/update',
      deleteUserAddress: '/address/delete/:addressId'
    }
  })
}

function getAllUserAddress(_req: Request, res: Response) {
  pool.query(
    `SELECT country, city, address, state, zip_code,  user_id 
    FROM address`,
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(200).json(result?.rows)
    }
  )
}
function getAllAddressByUser(req: Request, res: Response) {
  const { userId } = req.body
  pool.query(
    `SELECT country, city, address, state, zip_code 
    FROM address 
    WHERE user_id = $1`,
    [userId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(200).json(result?.rows)
    }
  )
}
function getUserAddressById(req: Request, res: Response) {
  const { userId } = req.body
  const addressId = req.params.addressId
  pool.query(
    `SELECT country, city, street_address, state, zip_code 
    FROM address 
    WHERE user_id = $1 AND address_id = $2`,
    [userId, addressId],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(200).json(result?.rows)
    }
  )
}
function addAddress(req: Request, res: Response) {
  const { address, city, state, country, zipCode, userId } = req.body
  pool.query(
    `INSERT INTO address (street_address, city, state, country, zip_code, user_id) 
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [address, city, state, country, zipCode, userId],
    (error, result) => {
      if (result === undefined) {
        res.status(404).json(error)
      }
      res.status(201).json(result.rows)
    }
  )
}
function updateUserAddress(req: Request, res: Response) {
  const { address, city, state, country, zipCode, addressId } = req.body
  pool.query(
    `UPDATE address SET street_address = $1, city = $2, state = $3, country = $4, zip_code = $5 WHERE address_id = $6`,
    [address, city, state, country, zipCode, addressId],
    (error, result: any) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result.rows)
    }
  )
}
function deleteUserAddress(req: Request, res: Response) {
  const { userId, addressId } = req.body
  pool.query(
    `DELETE FROM address WHERE user_id = $1 AND address_id = $2`,
    [userId, addressId],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message })
        return
      } else if (result.rowCount === 0) {
        res
          .status(404)
          .json({ message: 'No se encontró la dirección para eliminar' })
        return
      }
      res.status(200).json({ message: 'Dirección eliminada exitosamente' })
    }
  )
}

export {
  addAddress,
  updateUserAddress,
  getUserAddressById,
  deleteUserAddress,
  getAllAddressByUser,
  addressRoutes,
  getAllUserAddress
}
