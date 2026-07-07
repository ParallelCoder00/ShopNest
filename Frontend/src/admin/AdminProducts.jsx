import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context.jsx'

function AdminProducts() {
    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products')
            const data = await res.json()
            const payload = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
            setProducts(payload)
        }
        fetchProducts()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${user?.token}` },
            })
            if (res.ok) {
                setProducts((prev) => prev.filter((p) => p._id !== id))
            }
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">Inventory</p>
                        <h2 className="mt-1 text-2xl font-semibold text-white">Manage Products</h2>
                    </div>
                    <Link to="/admin/add-product" className="inline-flex items-center justify-center rounded-full border border-orange-500/40 bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
                        + Add product
                    </Link>
                </div>

                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl shadow-black/20">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-zinc-800">
                            <thead className="bg-zinc-950/80">
                                <tr>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">ID</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Name</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Price</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Category</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Stock</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {products.map((product) => (
                                    <tr key={product._id} className="bg-zinc-900/60 hover:bg-zinc-800/70">
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-400">{product._id?.substring(0, 8)}...</td>
                                        <td className="px-4 py-4 text-sm font-medium text-white">{product.name}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">₹{Number(product?.price ?? 0).toFixed(2)}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">{product.category}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">{product.stock}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                                            <div className="flex flex-wrap gap-2">
                                                <Link to={`/admin/edit-product/${product._id}`} className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-2 font-semibold text-zinc-200 transition hover:border-orange-400 hover:text-orange-300">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(product._id)} className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-2 font-semibold text-red-300 transition hover:bg-red-500/20">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProducts