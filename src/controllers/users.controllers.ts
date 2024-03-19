/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import pool from '../db'
import bycript from 'bcryptjs'
import createToken from '../libs/jwt'
import type {
  Id,
  OrdinalRole,
  User,
  // Users,
  RequestLoginType
} from '../types/user.types.d'
import {
  roles,
  tokenErrors,
  userErrors,
  userSuccess
} from '../constant/constantes'

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
  pool.query(
    'SELECT user_id, name, last_name, email, phone, phone_prefix FROM users;',
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      } else if (result.rowCount === 0) {
        res.status(404).json({ message: 'No hay usuarios' })
        return
      }
      res.status(200).json(result.rows)
    }
  )
}
function getUserById(req: Request, res: Response) {
  const id = req.params.userId
  pool.query(
    'SELECT user_id, name, last_name, email, phone, phone_prefix FROM users WHERE user_id = $1',
    [id],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
        return
      } else if (result.rowCount === 0) {
        res.status(404).json({ message: 'No hay usuarios con este id' })
        return
      }
      res.status(200).json(result.rows)
    }
  )
}
async function addUser(req: Request, res: Response) {
  const { name, email, last_name, password, role }: User = req.body
  try {
    const passwordHash = await bycript.hash(password, 10)
    const result = await pool.query(
      `INSERT INTO users (name, last_name, email, password, role) 
    VALUES ($1, $2, $3, $4, $5)`,
      [name, last_name, email, passwordHash, role]
    )
    console.log(result)
    return res.status(201).json({ message: 'Usuario creado' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error al agregar usuario' })
  }
}
function addOrdinalUser(req: Request, res: Response) {
  const { name, email, last_name, password }: User = req.body
  const role: OrdinalRole = roles.user
  pool.query(
    `INSERT INTO users (name, last_name, email, password, role) 
    VALUES ($1, $2, $3, $4, $5)`,
    [name, last_name, email, password, role],
    (error, result) => {
      if (error) {
        res.status(404).json(error)
      }
      res.status(201).json(result.rows)
    }
  )
}
function updateUser(req: Request, res: Response) {
  const {
    name,
    email,
    last_name,
    password,
    role,
    phone,
    phone_prefix,
    user_id
  }: User = req.body
  if (!user_id) {
    res.status(404).json({ message: 'Falta el id del usuario' })
    return
  }
  pool.query(
    `UPDATE users SET name = $1, last_name = $2, email = $3, password = $4, role = $5, phone = $6, phonePrefix = $7 WHERE user_id = $8`,
    [name, last_name, email, password, role, phone, phone_prefix, user_id],
    (error, result: any) => {
      if (result === undefined) {
        res.status(404).json(error)
      }
      res.status(201).json(result.rows)
    }
  )
}
function deleteUser(req: Request, res: Response) {
  const id: Id = parseInt(req.params.userId)
  pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, result) => {
    if (error) {
      res.status(404).json(error)
      return
    }
    res.status(201).json(result.rows)
  })
}
async function login(req: Request, res: Response) {
  const { email, password }: RequestLoginType = req.body
  const result = await pool.query(
    'SELECT user_id, email, password, role FROM users WHERE email = $1',
    [email]
  )
  if (!result) {
    // Error al buscar el usuario
    return res
      .status(404)
      .json({ message: userErrors.USER_NOT_FOUND, error: result })
  } else if (result.rowCount === 0) {
    // No hay usuarios con este email
    return res.status(401).json({ message: userErrors.EMAIL_NOT_FOUND })
  }
  // Encaso de que el usuario exista
  const user = result.rows[0] as User

  const passwordMatch = await bycript.compare(password, user.password)
  if (!passwordMatch) {
    // Contraseña incorrecta
    return res.status(401).json({ message: userErrors.INCORRECT_PASSWORD })
  }
  // Crear token
  const token = await createToken({ id: user.user_id, role: user.role })
  if (!token) {
    // Error al crear el token
    return res
      .status(401)
      .json({ message: tokenErrors.TOKEN_NOT_CREATED, error: token })
  }
  // Login exitoso
  return res
    .status(200)
    .cookie('token', token)
    .json({ message: userSuccess.USER_LOGGED })
}
function logout(_req: Request, res: Response) {
  return res
    .cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true })
    .json({ message: userSuccess.USER_LOGOUT })
}
export {
  usersRoutes,
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addOrdinalUser,
  login,
  logout
}
