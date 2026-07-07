import { User } from "../Models/user.model.js"
import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import { sendEmail } from "../Utils/sendEmail.js"
import { Order } from "../Models/order.model.js"

const createOrder = asyncHandler(async (req, res) => {

    try {
        const { items, totalAmount, address , paymentId } = req.body
        if(!items || items.length === 0 || !totalAmount || !address || !paymentId){
            throw new ApiError(400 , "Invalid order data")
        }
        else{
            const order = await Order.create({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })

            const message = `Dear ${req.user.name}, \n\nThankyou for placing your order! Your order is created successfully. The following details: \n\nOrder ID:${order._id}\nTotal Amount:${totalAmount}\nShipping Address:${address}\nPayment ID:${paymentId}`
            await sendEmail(req.user.email , "Order Created" , message)
            res
            .status(201)
            .json(
                new ApiResponse(201 , order , "Order created successfully")
            )
        }
    } catch (error) {
        throw new ApiError(500 , "Error creating order" , error)
    }
})

const myOrders = asyncHandler(async(req , res) => {
    try {
        const orders = await Order.find({user: req.user._id}).populate('items.product','name price')
        res
        .status(201)
        .json(
            new ApiResponse(201 , orders , "The orders has been fetched")
        )
    } catch (error) {
        throw new ApiError(500 , "Error fetching orders", error)
    }
})

const getOrders = asyncHandler(async(req , res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name')
        res
        .status(200)
        .json(
            new ApiResponse(200 , orders , "The order has been fetched")
        )
    } catch (error) {
        throw new ApiError(500 , "Error fetching orders" , error)
    }
})

const updateOrderStatus = asyncHandler(async(req , res) => {
    try {
        const status = req.body.status?.toLowerCase()
        
        if(!status){
            throw new ApiError(400 , "Status is required")
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true, runValidators: true }
        )
        if(order){
            res
            .status(200)
            .json(
                new ApiResponse(200 , order , "Order status updated")
            )
        } else{
            throw new ApiError(404 , "Order not found")
        }
    } catch (error) {
        console.error("Error updating order status:", error.message)
        throw error
    }
})

export { createOrder }
export { myOrders }
export { getOrders }
export { updateOrderStatus }
