import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);


import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import connectDB from "./DB/db.js"
import { User } from "./Models/user.model.js"
import { Product } from "./Models/product.model.js"
import { Order } from "./Models/order.model.js"

dotenv.config()

const users = [
  {
    name: "Admin User",
    email: "admin@shopnest.com",
    password: bcrypt.hashSync("Admin123", 10),
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("Password123", 10),
    role: "user",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: bcrypt.hashSync("Password123", 10),
    role: "user",
  },
]

const products = [
  {
    name: "Wireless Headphones",
    description: "Comfortable over-ear headphones with noise cancellation.",
    price: 89.99,
    category: "Electronics",
    stock: 45,
    imageUrl: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycGhvbmVzfGVufDB8fDB8fHww",
  },
  {
    name: "Nike Running Shoes",
    description: "Lightweight running shoes for daily training.",
    price: 69.99,
    category: "Footwear",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor.",
    price: 129.99,
    category: "Wearables",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Macbook Pro",
    description: "Apple Macbook Pro with M1 chip and Retina display.",
    price: 1499.99,
    category: "Computers",
    stock: 20,
    imageUrl: "https://plus.unsplash.com/premium_photo-1670274609267-202ec99f8620?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
  }
]

const importData = async () => {
  try {
    await connectDB()

    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const createdProducts = await Product.insertMany(products)

    const sampleOrder = {
      user: createdUsers[1]._id,
      items: [
        {
          product: createdProducts[0]._id,
          quantity: 1,
          price: String(createdProducts[0].price),
        },
        {
          product: createdProducts[1]._id,
          quantity: 2,
          price: String(createdProducts[1].price),
        },
      ],
      totalAmount: String(createdProducts[0].price + createdProducts[1].price * 2),
      address: {
        fullname: "John Doe",
        street: "123 Market Street",
        city: "Los Angeles",
        postalCode: "90001",
        country: "USA",
      },
      paymentId: "pay_dummy_12345",
      status: "pending",
    }

    await Order.insertMany([sampleOrder])

    console.log("Data imported successfully")
    process.exit()
  } catch (error) {
    console.error("Error importing data:", error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await connectDB()
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log("Data destroyed successfully")
    process.exit()
  } catch (error) {
    console.error("Error destroying data:", error)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
