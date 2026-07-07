import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const productId = product?._id || "";
  const productName = product?.name || "Product";
  const price = Number(product?.price ?? 0);
  const safePrice = Number.isFinite(price) ? price : 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm transition-all duration-200 ease-in hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative overflow-hidden rounded-md bg-slate-100 shadow-sm shadow-gray-700">
        <img
          src={product?.imageUrl || "/main_logo.png"}
          alt={productName}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-5">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-lg font-semibold text-black">{productName}</h3>
          <p className="text-sm text-slate-500">Fast shipping · Reliable quality</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xl font-semibold text-slate-900">₹{safePrice.toFixed(2)}</p>
          <Link
            to={`/product/${productId}`}
            className="inline-flex items-center justify-center rounded-full border border-gray-800 bg-slate-400 px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:border-white hover:bg-slate-300 hover:text-black hover:shadow-md hover:shadow-zinc-400 hover:backdrop-blur-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
