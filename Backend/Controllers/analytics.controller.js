import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import { User } from "../Models/user.model.js"
import { Product } from "../Models/product.model.js"
import { Order } from "../Models/order.model.js"

const getAdminStats = asyncHandler(async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' })
        const totalProducts = await Product.countDocuments({})
        const totalOrders = await Order.countDocuments({})

        const orders = await Order.find({})
        const totalRevenueData = orders.reduce((acc, order) => {
            const amount = Number(order.totalAmount)
            return acc + (Number.isFinite(amount) ? amount : 0)
        }, 0)

        res
        .status(200)
        .json(
            new ApiResponse(200 , {totalUsers , totalOrders , totalProducts , totalRevenue: totalRevenueData})
        )

    } catch (error) {
        throw new ApiError(500 , "Error fetching stats" , error)
    }
})

export {getAdminStats}
