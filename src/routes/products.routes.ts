import { Router } from 'express'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  productsRoutes
} from '../controllers/products.controllers'
import validateRoll from '../middlewares/validateRoll.middlewares'

const { Admin } = validateRoll

const router = Router()

router.get('/', productsRoutes)
router.get('/all', getAllProducts)
router.get('/:productId', getProductsById)

router.post('/add', Admin, addProduct)
router.put('/update', Admin, updateProduct)
router.delete('/delete/:productId', Admin, deleteProduct)

export default router
