import React from "react";

function Disclaimer() {
  return (
    <main className="min-h-[calc(100vh-10rem)] bg-black text-white">
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-orange-500/20 bg-neutral-950 p-8 shadow-xl shadow-black/40 sm:p-10">
          <span className="inline-flex rounded-full bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-300">
            Disclaimer
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Clear information for a better shopping experience.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300">
            The information on ShopNest is provided for general shopping and
            product discovery purposes. We work to keep product details,
            pricing, and availability accurate, but details may change without
            notice.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-orange-300">
              Product Information
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Images, descriptions, colors, and specifications are shown as
              accurately as possible, but the actual product may vary slightly
              depending on stock, display settings, or supplier updates.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-orange-300">
              Pricing And Availability
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Prices and availability may change based on inventory, offers, or
              operational updates. Final order details are confirmed during
              checkout.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-orange-300">
              External Services
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Payment, delivery, and communication services may be handled by
              trusted third-party providers. Their own terms may apply when you
              use those services.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-orange-300">
              Customer Responsibility
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Please review product details, delivery information, and order
              totals before placing an order. Contact support if anything looks
              unclear.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Disclaimer;
