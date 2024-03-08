import { Router } from 'express'
import {
  addProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoriesById,
  productCategoriesRoutes,
  updateProductCategory
} from '../controllers/productCategories.controllers'
import validateRoll from '../middlewares/validateRoll.middlewares'

const { Admin } = validateRoll

const router = Router()

router.get('/', productCategoriesRoutes)
router.get('/all', getAllProductCategories)
router.get('/:categoryId', getProductCategoriesById)
router.post('/add', Admin, addProductCategory)
router.put('/update/', Admin, updateProductCategory)
router.delete('/delete/:categoryId', Admin, deleteProductCategory)

export default router
