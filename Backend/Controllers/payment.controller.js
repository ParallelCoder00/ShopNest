import Razorpay from "razorpay"
import crypto from "crypto"
import dotenv from "dotenv"
import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
dotenv.config()

const createOrder = asyncHandler(async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
        const options = {
            amount: req.body.amount * 100,
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex')
        }
        const order = await instance.orders.create(options)
        res
            .status(200)
            .json(
                new ApiResponse(200, order, "Order is created")
            )
    } catch (error) {
        throw new ApiError(500, "server error", error)
    }
})


const verifyPayment = asyncHandler(async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex")

        if (generated_signature === razorpay_signature) {
            res
                .status(200)
                .json(
                    new ApiResponse(200, {}, "Payment verified successfully")
                )
        } else {
            throw new ApiError(400, "Payment verification failed")
        }
    } catch (error) {
        throw new ApiError(500, "Server error", error)
    }
})

export {createOrder}
export {verifyPayment}

