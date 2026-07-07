import { Router } from "express";
import { protect } from "../Middleware/auth.middleware.js";
import { admin } from "../Middleware/admin.middleware.js";
import { createOrder , getOrders , myOrders , updateOrderStatus } from "../Controllers/order.controller.js"
 

const router = Router()

router.route('/').post(protect , createOrder).get(protect , admin , getOrders)
router.route('/myorders').get(protect , myOrders)
router.route('/:id/status').put(protect , admin , updateOrderStatus)


export default router