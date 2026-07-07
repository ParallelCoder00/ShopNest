import { User } from "../Models/user.model.js"
import { asyncHandler } from "../Utils/asyncHandler.js"
import { ApiResponse } from "../Utils/ApiResponse.js"
import { ApiError } from "../Utils/ApiError.js"
import { Product } from "../Models/product.model.js"
import { cloudinary } from "../Utils/cloudinary.js"

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        res
            .status(200)
            .json(
                new ApiResponse(200, products, "Products are fetched successfully")
            )
    } catch (error) {
        throw new ApiError(500, "Server Error")
    }
})

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res
                .status(200)
                .json(
                    new ApiResponse(200, product, "Product found")
                )
        } else {
            throw new ApiError(404, "Product not found")
        }
    } catch (error) {
        throw new ApiError(500, "Server error")
    }
})

const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)

            imageUrl = result.secure_url
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        })
        res
            .status(201)
            .json(
                new ApiResponse(201, product, "The product is created")
            )
    } catch (error) {
        throw new ApiError(500, "Sever error")
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body
        const product = await Product.findById(req.params.id)
        if (product) {
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.category = category || product.category
            product.stock = stock || product.stock
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                product.imageUrl = result.secure_url             
            }
            const updatedProduct = await product.save()
            res
            .status(201)
            .json(
                new ApiResponse(201 , updatedProduct , "Product is updated")
            )
        } else{
            throw new ApiError(404 , "Product not found")
        }
    } catch (error) {
        throw new ApiError(500 , "Server Error")
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            const deletedProduct = await product.deleteOne()
            res
            .status(200)
            .json(
                new ApiResponse(200 , deletedProduct , "The product is deleted" )
            )
        } else{
            throw new ApiError(404 , "Product not found")
        }
    } catch (error) {
        throw new ApiError(500 , "Server error")
    }
})

export {getProducts}
export {getProductById}
export {createProduct}
export {updateProduct}
export {deleteProduct}