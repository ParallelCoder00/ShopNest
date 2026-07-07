import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context.jsx'
import { useNavigate } from 'react-router-dom'

function AddProducts() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '', description: '', category: '', price: '', stock: '',
    })
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
        }
    }, [navigate, user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image) {
            return alert('Please select an image')
        }

        setLoading(true)
        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)
        data.append('price', formData.price)
        data.append('category', formData.category)
        data.append('stock', formData.stock)
        data.append('image', image)

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { Authorization: `Bearer ${user.token}` },
                body: data,
            })

            const responseData = await res.json()

            if (res.ok) {
                alert('Product created successfully with Cloudinary image URL!')
                navigate('/shop')
            } else {
                alert(responseData.message || 'Error creating product')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const inputClasses = 'w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10'

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">Catalog</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Add New Product</h2>
                <p className="mt-2 text-sm text-zinc-400">Create a polished product entry with a clear image and full details.</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <input type="text" placeholder="Product Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClasses} />
                    <textarea placeholder="Description" required rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={inputClasses} />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <input type="number" placeholder="Price" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className={inputClasses} />
                        <input type="number" placeholder="Stock Quantity" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className={inputClasses} />
                    </div>
                    <input type="text" placeholder="Category" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputClasses} />

                    <div className="rounded-2xl border border-dashed border-orange-500/30 bg-zinc-950/70 p-4">
                        <label className="mb-3 block text-sm font-medium text-zinc-300">Upload Product Image (Cloudinary)</label>
                        <input type="file" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} className="block w-full text-sm text-zinc-400 file:mr-4 file:rounded-full file:border-0 file:bg-orange-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-300" />
                    </div>

                    <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full border border-orange-500/40 bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70">
                        {loading ? 'Uploading & Creating...' : 'Publish Product'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProducts