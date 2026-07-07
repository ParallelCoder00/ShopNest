import {Router} from "express"
import { protect } from "../Middleware/auth.middleware.js"
import { admin } from "../Middleware/admin.middleware.js"
import {getAdminStats} from "../Controllers/analytics.controller.js"

const router = Router()

router.get('/',getAdminStats)

export default router