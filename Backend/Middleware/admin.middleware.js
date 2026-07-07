import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiError } from "../Utils/ApiError.js"

const admin = asyncHandler(async(req , res , next) =>{
    if(req.user && req.user.role === 'admin'){
        next()
    }else{
        throw new ApiError(401 , "Access denied , only admin!")
    }
})

export {admin}