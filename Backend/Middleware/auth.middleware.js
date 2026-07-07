import { User } from "../Models/user.model.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";


const protect = asyncHandler(async(req , res , next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token , process.env.TOKEN_SECRET)
            req.user = await User.findById(decodedToken.id).select('-password')
            next()
        } catch (error) {
            throw new ApiError(401 , "User is not authorised , token failed")
        }
    } else if(!token){
        throw new ApiError(401 , " Not authorised , their is no token")
    }
})

export {protect}