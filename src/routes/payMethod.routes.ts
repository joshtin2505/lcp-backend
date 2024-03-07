import { Router } from 'express'
import {
  addPayMethod,
  deletePayMethod,
  getAllPayMethods,
  getPayMethodById,
  payMethodRoutes,
  updatePayMethod
} from '../controllers/paymethod.controllers'
import { authUser } from '../middlewares/validateRoll.middlewares'

const router = Router()

router.get('/', payMethodRoutes)
router.get('/all', authUser, getAllPayMethods)
router.get('/:payMethodId', authUser, getPayMethodById)
router.post('/add', authUser, addPayMethod)
router.put('/update/', authUser, updatePayMethod)
router.delete('/delete/:payMethodId', authUser, deletePayMethod)

export default router
