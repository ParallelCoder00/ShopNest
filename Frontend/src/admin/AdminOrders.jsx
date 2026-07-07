import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context.jsx'

function AdminOrders() {
    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch('/api/orders', {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const data = await res.json()
            const payload = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
            setOrders(payload)
        }
        fetchOrders()
    }, [user])

    const updateStatus = async (id, status) => {
        const nextStatus = status.toLowerCase()
        const res = await fetch(`/api/orders/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
            body: JSON.stringify({ status: nextStatus }),
        })

        if (res.ok) {
            setOrders((prev) => prev.map((order) => (order._id === id ? { ...order, status: nextStatus } : order)))
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">Orders</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">Manage Orders</h2>
                </div>

                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl shadow-black/20">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-zinc-800">
                            <thead className="bg-zinc-950/80">
                                <tr>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Order ID</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">User</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Total</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Date</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {orders.map((order) => (
                                    <tr key={order._id} className="bg-zinc-900/60 hover:bg-zinc-800/70">
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-400">{order._id?.substring(0, 8)}...</td>
                                        <td className="px-4 py-4 text-sm text-white">{order.user?.name || 'Deleted User'}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">₹{Number(order?.totalAmount ?? 0).toFixed(2)}</td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-4 text-sm">
                                            <select
                                                value={order.status?.toLowerCase() || 'pending'}
                                                onChange={(e) => updateStatus(order._id, e.target.value)}
                                                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none transition focus:border-orange-400"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
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

export default AdminOrders
