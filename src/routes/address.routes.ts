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
import validateRoll from '../middlewares/validateRoll.middlewares'

const { Admin, User } = validateRoll

const router = Router()

router.get('/', addressRoutes)

router.get('/all-address', Admin, getAllUserAddress)

router.get('/all', User, getAllAddressByUser)
router.get('/:addressId', User, getUserAddressById)
router.post('/add', User, addAddress)
router.delete('/delete/:addressId', User, deleteUserAddress)
router.put('/update', User, updateUserAddress)

export default router
