import { Router } from 'express'
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  productsRoutes
} from '../controllers/products.controllers'
import { authAdmin } from '../middlewares/validateRoll.middlewares'

const router = Router()

router.get('/', productsRoutes)
router.get('/all', getAllProducts)
router.get('/:productId', getProductsById)

router.post('/add', authAdmin, addProduct)
router.put('/update', authAdmin, updateProduct)
router.delete('/delete/:productId', authAdmin, deleteProduct)

export default router
