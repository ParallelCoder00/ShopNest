import mongoose from "mongoose"
import DB_NAME from "../constants.js"

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DB_NAME}`

        const connectionInstance = await mongoose.connect(mongoUri, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000,
            family: 4,
        })

        console.log(`MongoDB connected successfully to ${connectionInstance.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

export default connectDB
