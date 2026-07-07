import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context.jsx'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/')
            return
        }

        const fetchStats = async () => {
            try {
                const res = await fetch('/api/analytics', {
                    headers: { Authorization: `Bearer ${user.token}` },
                })
                const data = await res.json()
                if (res.ok) {
                    setStats(data?.data ?? data)
                } else {
                    if (res.status === 401) {
                        navigate('/login')
                    }
                    setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 })
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchStats()
    }, [user, navigate])

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/main_logo.png" alt="logo" className="h-12 w-12 rounded-2xl object-cover shadow-lg shadow-orange-500/20" />
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">ShopNest control center</p>
                            <h2 className="mt-1 text-2xl font-semibold text-white">Admin Dashboard</h2>
                        </div>
                    </div>
                    <div className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
                        Welcome back, {user?.name || 'Admin'}
                    </div>
                </div>

                {stats ? (
                    <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            { label: 'Total Orders', value: stats.totalOrders },
                            { label: 'Total Products', value: stats.totalProducts },
                            { label: 'Total Users', value: stats.totalUsers },
                            { label: 'Total Revenue', value: `₹${Number(stats.totalRevenue || 0).toFixed(2)}` },
                        ].map((item) => (
                            <div key={item.label} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-lg shadow-black/20">
                                <p className="text-sm font-medium text-zinc-400">{item.label}</p>
                                <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-6 py-4 text-center text-orange-300">
                        Loading metrics...
                    </div>
                )}

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-white">Administrative controls</h3>
                            <p className="mt-1 text-sm text-zinc-400">Manage your catalog, orders, and customers from one place.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="inline-flex items-center justify-center rounded-full border border-orange-500/40 bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400" onClick={() => navigate('/admin/add-product')}>
                            + Add product
                        </button>
                        <button className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-orange-400 hover:text-orange-300" onClick={() => navigate('/admin/products')}>
                            📦 Manage products
                        </button>
                        <button className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-orange-400 hover:text-orange-300" onClick={() => navigate('/admin/orders')}>
                            🚚 Manage orders
                        </button>
                        <button className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-orange-400 hover:text-orange-300" onClick={() => navigate('/admin/users')}>
                            👥 User directory
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard