import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const productList = Array.isArray(data) ? data : data.data || [];
        setProducts(productList);
        setError('');
      } catch (error) {
        console.error(error);
        setError('Products could not be loaded right now.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = product?.name || '';
    return productName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <main className="mx-auto min-h-[80vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400">ShopNest store</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">All Products</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Find clean picks for your home, desk, wardrobe, and everyday needs.
          </p>
        </div>

        <label className="relative w-full md:max-w-sm">
          <span className="sr-only">Search products</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
          />
        </label>
      </div>

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-3xl border border-zinc-800 bg-zinc-900/70"
            />
          ))}
        </div>
      ) : error ? (
        <section className="rounded-2xl border border-red-500/20 bg-red-950/20 px-6 py-14 text-center shadow-xl shadow-black/20">
          <h3 className="text-2xl font-semibold text-white">Shop is unavailable</h3>
          <p className="mt-3 text-sm text-red-200">{error}</p>
        </section>
      ) : filteredProducts.length === 0 ? (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-6 py-14 text-center shadow-xl shadow-black/20">
          <h3 className="text-2xl font-semibold text-white">No products found</h3>
          <p className="mt-3 text-sm text-zinc-400">Try a different search term.</p>
        </section>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Shop;
