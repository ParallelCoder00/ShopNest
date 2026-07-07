import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context.jsx'

function AdminUsers() {
    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/auth/users', {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const data = await res.json()
            const payload = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
            setUsers(payload)
        }
        fetchUser()
    }, [user])

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/20">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">Customers</p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">User Directory</h2>
                </div>

                <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl shadow-black/20">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-zinc-800">
                            <thead className="bg-zinc-950/80">
                                <tr>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">ID</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Name</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Email</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Role</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {users.map((u) => (
                                    <tr key={u._id} className="bg-zinc-900/60 hover:bg-zinc-800/70">
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-400">{u._id?.substring(0, 8)}...</td>
                                        <td className="px-4 py-4 text-sm text-white">{u.name}</td>
                                        <td className="px-4 py-4 text-sm text-zinc-300">{u.email}</td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${u.role === 'admin' ? 'bg-orange-500/10 text-orange-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
                                                {u.role?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">{new Date(u.createdAt).toLocaleDateString()}</td>
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

export default AdminUsers