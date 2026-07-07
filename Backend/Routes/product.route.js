import { Router } from "express";
import { protect } from "../Middleware/auth.middleware.js";
import { admin } from "../Middleware/admin.middleware.js";
import {getProducts , createProduct , getProductById , updateProduct , deleteProduct} from "../Controllers/product.controller.js"
import multer from "multer"

const upload = multer({dest: 'uploads/'})
 

const router = Router()

// All products
router.route('/').get(getProducts).post(protect , admin , upload.single('image') , createProduct)

// Specific products
router.route('/:id').get(getProductById).put(protect , admin , upload.single('image') , updateProduct).delete(protect , admin , deleteProduct)


export default router