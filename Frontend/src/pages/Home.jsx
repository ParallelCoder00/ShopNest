import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading , setLoading] = useState(true)


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products') 
                const data = await res.json()
                const productList = Array.isArray(data) ? data : data.data || []
                setProducts(productList.slice(0 , 4))
            } catch (error) {
                console.error(error)
            } finally{
                setLoading(false)
            }
        };
        fetchProducts()
    } , [])
    return (
        <div className="min-h-[calc(100vh-10rem)] bg-zinc-950 text-slate-100">
            <div className="mx-auto max-w-[15560px]">
                <section className="overflow-hidden rounded-b-4xl border-b border-gray-100/10 bg-linear-to-r from-black to-orange-950 p-6 sm:p-10">
                    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center">
                        <div className="max-w-2xl flex flex-col items-center">
                            <span className="inline-flex rounded-full bg-orange-500/15 px-3 py-1 text-sm font-semibold text-orange-300">Premium selection</span>
                            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Welcome to ShopNest</h1>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">Discover the best products at affordable price.</p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:brightness-110">Shop Now</Link>
                                <Link to="/cart" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 bg-transparent hover:bg-white/5 hover:backdrop-blur-md hover:border-white/30 hover:shadow-lg">View Cart</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-12">
                    <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-3xl font-semibold sm:text-4xl bg-linear-to-r from-gray-500 via-gray-300 to-gray-500 bg-clip-text text-transparent ml-4 cursor-default ">Featured Products</h2>
                        </div>
                    </div>

                    {loading ? (
                        <div className="mt-8 rounded-4xl border border-white/10 bg-zinc-950 p-10 text-center text-slate-300 shadow-xl shadow-slate-950/30">Loading products...</div>
                    ) : (
                        <div className="mt-8 flex justify-center  gap-10 pb-5 ">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
