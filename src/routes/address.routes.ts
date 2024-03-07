import { Router } from 'express'
import {
  addressRoutes,
  getAllAddressByUser,
  addAddress,
  deleteUserAddress,
  updateUserAddress,
  getAllUserAddress,
  getUserAddressById
} from '../controllers/address.controllers'
import { authAdmin, authUser } from '../middlewares/validateRoll.middlewares'

const router = Router()

router.get('/', addressRoutes)

router.get('/all-address', authAdmin, getAllUserAddress)

router.get('/all', authUser, getAllAddressByUser)
router.get('/:addressId', authUser, getUserAddressById)
router.post('/add', authUser, addAddress)
router.delete('/delete/:addressId', authUser, deleteUserAddress)
router.put('/update', authUser, updateUserAddress)

export default router
