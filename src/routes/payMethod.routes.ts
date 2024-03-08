import { Router } from 'express'
import {
  addPayMethod,
  deletePayMethod,
  getAllPayMethods,
  getPayMethodById,
  payMethodRoutes,
  updatePayMethod
} from '../controllers/paymethod.controllers'
import validateRoll from '../middlewares/validateRoll.middlewares'

const { User } = validateRoll

const router = Router()

router.get('/', payMethodRoutes)
router.get('/all', User, getAllPayMethods)
router.get('/:payMethodId', User, getPayMethodById)
router.post('/add', User, addPayMethod)
router.put('/update/', User, updatePayMethod)
router.delete('/delete/:payMethodId', User, deletePayMethod)

export default router
