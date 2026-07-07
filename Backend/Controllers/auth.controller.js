import {User} from "../Models/user.model.js"
import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { sendEmail } from "../Utils/sendEmail.js"

const generateToken = (id)=>{
    return jwt.sign({id},process.env.TOKEN_SECRET , {expiresIn: '30d'})
}

//Register new user
const registerUser = asyncHandler(async(req , res) => {
    const { name , email , password  } = req.body
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res
            .status(400)
            .json(
                new ApiResponse(400 , {} , "The user already exists")
            )
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const user = await User.create({name , email , password: hashedPassword})
        if(user){
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const message = `Your OTP for ShopNest is: ${otp}`

            await sendEmail(email , "Welcome to ShopNest - Your OTP for registration" , message)

            res
            .status(201)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }else{
            throw new ApiError(400 , "Invalid user data")
        }

    } catch (error) {
        throw new ApiError(400 , "Something went wrong")
    }
})

// Login User

const loginUser = asyncHandler(async(req , res)=>{
    const {email , password} = req.body
    try {
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password , user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id) 
            });
        } else{
            throw new ApiError(400 , "Invalid email or password")
        }
    } catch (error) {
        throw error
    }

    
})

const getUsers = asyncHandler(async(req , res)=>{
    try {
        const users = await User.find({}).select("-password")
        res
        .status(200)
        .json(
            new ApiResponse(200 , users , "User fetched successfully")
        )
    } catch (error) {
        throw new ApiError(400 , "Server Error")
    }
})

export {registerUser}
export {loginUser}
export {getUsers}
