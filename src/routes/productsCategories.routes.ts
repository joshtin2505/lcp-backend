import { Router } from 'express'
import {
  addProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoriesById,
  productCategoriesRoutes,
  updateProductCategory
} from '../controllers/productCategories.controllers'
import { authAdmin } from '../middlewares/validateRoll.middlewares'

const router = Router()

router.get('/', productCategoriesRoutes)
router.get('/all', getAllProductCategories)
router.get('/:categoryId', getProductCategoriesById)
router.post('/add', authAdmin, addProductCategory)
router.put('/update/:categoryId', authAdmin, updateProductCategory)
router.delete('/delete/:categoryId', authAdmin, deleteProductCategory)

export default router
