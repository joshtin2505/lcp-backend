import { Router } from 'express'
import { getAllUsers, usersRoutes } from '../controllers/users.controllers'

const router = Router()

router.get('/', usersRoutes)
router.get('/all', getAllUsers)

export default router
