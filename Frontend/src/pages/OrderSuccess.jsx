import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/70 px-6 py-12 text-center shadow-xl shadow-black/20 sm:px-8">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-300">Order placed</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Payment Successful!</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-400">
          Thank you for your order. We have securely received your payment and will process your shipment shortly.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-400"
        >
          Continue Shopping
        </Link>
      </section>
    </main>
  );
};

export default OrderSuccess;
