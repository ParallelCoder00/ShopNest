import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data.data || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          _id: product._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          qty: 1,
        }),
      );
      alert("Successfully added to your Cart");
    }
  };

  if (loading) {
    return (
      <main className="mx-auto min-h-[80vh] max-w-6xl px-4 py-10 text-orange-300 sm:px-6 lg:px-8">
        Loading Product...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto min-h-[80vh] max-w-6xl px-4 py-10 text-red-300 sm:px-6 lg:px-8">
        Product not found
      </main>
    );
  }

  const price = Number(product?.price ?? 0);
  const safePrice = Number.isFinite(price) ? price : 0;

  return (
    <main className="mx-auto min-h-[80vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-sm text-zinc-400">
        <Link to="/" className="font-semibold text-orange-300 transition hover:text-orange-200">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="font-semibold text-orange-300 transition hover:text-orange-200">
          Shop
        </Link>{" "}
        / {product.category} / <span className="text-white">{product.name}</span>
      </div>

      <section className="grid gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/20 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:p-8">
        <div className="overflow-hidden rounded-2xl bg-zinc-950">
          <img
            src={product.imageUrl || "/main_logo.png"}
            alt={product.name}
            className="h-full min-h-96 w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400">{product.category}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">{product.name}</h2>
          <p className="mt-5 text-4xl font-semibold text-white">₹{safePrice.toFixed(2)}</p>

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-white">Product Description</h4>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{product.description}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-400 sm:w-auto"
          >
            Add to Cart
          </button>

          <p className={`mt-5 text-sm font-semibold ${product.stock > 0 ? "text-emerald-300" : "text-red-300"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} units available)` : "Temporarily Out Of Stock"}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
