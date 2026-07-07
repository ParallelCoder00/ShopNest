import { Router } from "express";
import { registerUser , loginUser , getUsers } from "../Controllers/auth.controller.js"
import { protect } from "../Middleware/auth.middleware.js";
import { admin } from "../Middleware/admin.middleware.js";

const router = Router()


router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/users', protect , admin , getUsers)

export default router