import { Router } from 'express'
import {
  addItemToCart,
  cartRoutes,
  deleteItemFromCart,
  getAllItemsInCart,
  modifyQuantityProduct
} from '../controllers/cart.controllers'

const router = Router()

router.get('/', cartRoutes)
router.get('/all-cart-items', getAllItemsInCart)
router.post('/add-cart-item', addItemToCart)
router.put('/update-cart-item', modifyQuantityProduct)
router.delete('/delete-cart-item/:cartItemId', deleteItemFromCart)

export default router
