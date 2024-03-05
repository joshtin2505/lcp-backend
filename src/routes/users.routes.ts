import { Router } from 'express'
import {
  getAllUsers,
  getUserById,
  usersRoutes,
  addUser,
  addOrdinalUser,
  updateUser,
  deleteUser
} from '../controllers/users.controllers'
import { authMasterAdmin } from '../middlewares/validateRoll.middlewares'

const router = Router()

router.get('/', usersRoutes)
router.get('/all', authMasterAdmin, getAllUsers)
router.get('/:userId', authMasterAdmin, getUserById)
router.post('/add', authMasterAdmin, addUser)
router.put('/update', authMasterAdmin, updateUser)

router.post('/add-ordinal', addOrdinalUser)

router.delete('/delete/:userId', deleteUser)

export default router
