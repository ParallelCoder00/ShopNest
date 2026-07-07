import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);



import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./DB/db.js"
import authRouter from "./Routes/auth.route.js"
import productRouter from "./Routes/product.route.js"
import orderRouter from "./Routes/order.route.js"
import paymentRouter from "./Routes/payment.route.js"
import analyticsRouter from "./Routes/analytics.route.js"


dotenv.config()
connectDB()


const app = express()
app.use(cors(
    {
        origin: ['http://localhost:3000','http://127.0.0.1:3000'],
        credentials: true
    }
))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
    

app.get('/',(req , res)=>{
    res.send("Backend is working fine!")
})

//All Routes

app.use('/api/auth' , authRouter)
app.use('/api/products' , productRouter)
app.use('/api/orders' , orderRouter)
app.use('/api/payment' , paymentRouter)
app.use('/api/analytics' , analyticsRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || "Server Error",
        errors: err.errors || [],
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);  
}) 

