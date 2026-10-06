import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);


import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import connectDB from "./DB/db.js"
import { User } from "./Models/user.model.js"
import { Product } from "./Models/product.model.js"
import { Order } from "./Models/order.model.js"
import path from "node:path"
import { fileURLToPath } from "node:url"

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

export const products = [
  {
    seedKey: "wireless-headphones",
    name: "Wireless Headphones",
    description: "Comfortable over-ear headphones with noise cancellation.",
    price: 89.99,
    category: "Electronics",
    stock: 45,
    imageUrl: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycGhvbmVzfGVufDB8fDB8fHww",
  },
  {
    seedKey: "nike-running-shoes",
    name: "Nike Running Shoes",
    description: "Lightweight running shoes for daily training.",
    price: 69.99,
    category: "Footwear",
    stock: 60,
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    seedKey: "smart-watch",
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor.",
    price: 129.99,
    category: "Wearables",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    seedKey: "macbook-pro",
    name: "Macbook Pro",
    description: "Apple Macbook Pro with M1 chip and Retina display.",
    price: 1499.99,
    category: "Computers",
    stock: 20,
    imageUrl: "https://plus.unsplash.com/premium_photo-1670274609267-202ec99f8620?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    seedKey: "wired-earphones",
    name: "Wired Earphones",
    description: "Classic and light weight BEST quality possible.",
    price: 499.99,
    category: "Electronics",
    stock: 20,
    imageUrl: "https://i.pinimg.com/736x/49/bf/41/49bf41d3c18d4c29bedfa356c053f4b0.jpg",
  },
  {
    seedKey: "Smart-ring",
    name: "Smart Ring",
    description: "It is a great light weight product to track health.",
    price: 5499.99,
    category: "Fitness",
    stock: 35,
    imageUrl: "https://i.pinimg.com/1200x/c4/07/1d/c4071d5bb7d6076809ef9072f42c6cec.jpg",
  },
  {
    seedKey: "Iphone",
    name: "Iphone 17 pro",
    description: "Is their any question about the quality?",
    price: 112499.99,
    category: "Electronics",
    stock: 35,
    imageUrl: "https://i.pinimg.com/736x/df/93/01/df93011a28635a8372395b7ecc772a79.jpg",
  }
]

export const syncSeedProducts = async () => {
  for (const product of products) {
    const seedFields = { ...product }
    const existingSeedProduct = await Product.findOne({ seedKey: product.seedKey }).select("_id")
    const legacySeedProduct = existingSeedProduct || await Product.findOne({
      seedKey: { $exists: false },
      name: product.name,
      description: product.description,
      category: product.category,
    }).select("_id")

    if (legacySeedProduct) {
      await Product.updateOne({ _id: legacySeedProduct._id }, { $set: seedFields })
    } else {
      await Product.updateOne(
        { seedKey: product.seedKey },
        { $set: seedFields },
        { upsert: true }
      )
    }
  }
  console.log(`Synced ${products.length} seed products`)
}

const importData = async () => {
  try {
    await connectDB()
    await Promise.all(users.map((user) =>
      User.updateOne({ email: user.email }, { $setOnInsert: user }, { upsert: true })
    ))
    await syncSeedProducts()

    const [sampleUser, ...sampleProducts] = await Promise.all([
      User.findOne({ email: "john@example.com" }),
      ...products.slice(0, 2).map((product) => Product.findOne({ seedKey: product.seedKey })),
    ])

    const sampleOrder = {
      user: sampleUser._id,
      items: [
        {
          product: sampleProducts[0]._id,
          quantity: 1,
          price: String(sampleProducts[0].price),
        },
        {
          product: sampleProducts[1]._id,
          quantity: 2,
          price: String(sampleProducts[1].price),
        },
      ],
      totalAmount: String(sampleProducts[0].price + sampleProducts[1].price * 2),
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

    await Order.updateOne(
      { paymentId: sampleOrder.paymentId },
      { $setOnInsert: sampleOrder },
      { upsert: true }
    )

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

const isSeedScript = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isSeedScript) {
  if (process.argv[2] === "-d") {
    destroyData()
  } else {
    importData()
  }
}
