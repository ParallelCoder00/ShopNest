import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <footer className="bg-linear-to-r sticky top-[100vh] left-0 w-full from-zinc-950 via-zinc-800 to-zinc-950">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="leading-5">
                <h2 className="px-0 text-amber-600 text-2xl">ShopNest</h2>
                <p className="text-gray-400 text-sm px-0">Premium E-commerce Platform</p>
                </div>
                <ul className="flex flex-wrap text-gray-400 items-center gap-4 text-sm">
                    <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                    <li><Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
                    <li><Link to="/return-policy" className="hover:text-white transition-colors">Return Policy</Link></li>
                </ul>
                <p className="text-sm text-gray-400">&copy; 2026 ShopNest. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
