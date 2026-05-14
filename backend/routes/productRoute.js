import express from 'express'
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  addReview,
  aiFormatDescription
} from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js' 

const productRouter = express.Router()


productRouter.post(
  '/add',
  adminAuth,
  upload.array('images', 4), 
  addProduct
)

productRouter.post('/remove', adminAuth, removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProducts)
productRouter.post('/review', upload.array('images', 4), addReview)
productRouter.post('/ai-format', adminAuth, aiFormatDescription)

export default productRouter
