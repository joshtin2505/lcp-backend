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
import {
  authMasterAdmin,
  authUser,
  authAdmin
} from '../middlewares/validateRoll.middlewares'

const router = Router()

router.get('/', usersRoutes)

// This routes is for master admin
router.post('/add', authMasterAdmin, addUser)

// This routes is for admin and master admin
// router.get('/all', authAdmin, getAllUsers)
router.get('/all', getAllUsers)
router.get('/:userId', authAdmin, getUserById)

// This routes is for all users
router.delete('/delete/:userId', authUser, deleteUser)
router.put('/update', authUser, updateUser)
router.post('/logout', authUser, logout)

// This route is for no auth users
router.post('/add-ordinal', addOrdinalUser)
router.post('/login', login)

export default router
