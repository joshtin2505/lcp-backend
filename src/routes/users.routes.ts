/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import {
  getAllUsers,
  getUserById,
  usersRoutes,
  addUser,
  addOrdinalUser,
  updateUser,
  deleteUser,
  login,
  logout
} from '../controllers/users.controllers'
import { validateToken } from '../middlewares/validateToken.middlewares'
import validateRoll from '../middlewares/validateRoll.middlewares'

const { MasterAdmin, Admin, User } = validateRoll

const router = Router()

router.get('/', usersRoutes)

// This routes is for master admin
router.post('/add', validateToken, MasterAdmin, addUser)

// This routes is for admin and master admin
router.get('/all', validateToken, Admin, getAllUsers)
// router.get('/all', getAllUsers)
router.get('/:userId', validateToken, Admin, getUserById)

// This routes is for all users
router.delete('/delete/:userId', validateToken, User, deleteUser)
router.put('/update', validateToken, User, updateUser)
router.post('/logout', validateToken, User, logout) // ✅

// This route is for no auth users
router.post('/add-ordinal', addOrdinalUser)
router.post('/login', login) // ✅

export default router
