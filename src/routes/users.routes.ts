import { Router } from 'express'
import {
  getAllUsers,
  getUserById,
  usersRoutes
} from '../controllers/users.controllers'

const router = Router()

router.get('/', usersRoutes)
router.get('/all', getAllUsers)
router.get('/:id', getUserById)

export default router
