import React, { useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../context/auth.context.jsx";
import {useSelector} from 'react-redux'


const Navbar = () => {
    const {user , logout} = useContext(AuthContext)
    const cartItems = useSelector((state) => (state.cart.cartItems))
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return(
        <nav className="sticky top-0 z-50 w-full rounded-b-xl flex items-center bg-black/50 backdrop-blur-md shadow-lg shadow-black/40 px-8 py-4 h-20">
                <div className="mx-auto flex justify-between w-full max-w-362.5">
                <div className="flex w-57 items-center gap-3 text-white">
                    <Link to="/" className="flex w-full items-center justify-end gap-6">
                        <img src="/darkmode_logo.png" alt="ShopNest logo" className="h-10 w-10 rounded-full  shadow-amber-500 border border-slate-700 bg-white/5 p-2 shadow-[0_0_10px_1px_rgba(0,0,0,0.1)]" />
                        <span className="text-3xl font-semibold tracking-wide flex items-baseline">
                            ShopNest
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        </span>
                    </Link>
                </div>
                <ul className="flex justify-between items-center gap-8 text-lg font-medium text-gray-300">
                    <li><Link to="/shop" className="transition hover:underline underline-offset-6 hover:decoration-amber-500  hover:text-white">Shop</Link></li>
                    <li><Link to="/cart" className="transition hover:underline underline-offset-6 hover:decoration-amber-500 hover:text-white">Cart ({cartItems.length})</Link></li>
                    {user? (
                        <>
                        <li><Link to="/profile" className="transition-all hover:text-white">Hi, {user.name}</Link></li>
                        {user.role === 'admin' && <li><Link to="/admin" className="transition hover:text-white">Admin</Link></li>}
                        <li><button onClick={handleLogout} className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400">Logout</button></li>
                        </>
                    ) : (
                        <li><Link to="/login" className="rounded-full border-2 border-gray-500 px-3 py-2 transition hover:border-amber-500 hover:text-white">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
