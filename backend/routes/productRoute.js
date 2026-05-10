import express from 'express'
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct
} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const productRouter = express.Router()

// ✅ ADD PRODUCT (FIXED)
productRouter.post(
  '/add',
  adminAuth,
  upload.array('images', 4), // 🔥 IMPORTANT FIX
  addProduct
)

productRouter.post('/remove', adminAuth, removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProducts)

export default productRouter
