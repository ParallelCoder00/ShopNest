import React from "react";

function About() {
  return (
    <main className="min-h-[calc(100vh-10rem)] bg-black text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-300">
            About ShopNest
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simple shopping, reliable products, better everyday choices.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            ShopNest is built to make online shopping feel clean, quick, and
            trustworthy. We focus on useful products, fair pricing, and a smooth
            experience from browsing to checkout.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-600 bg-zinc-900 p-6 shadow-lg shadow-slate-950/30">
            <h2 className="text-xl font-semibold text-orange-300">Quality First</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Every product is selected with usability, value, and customer
              satisfaction in mind.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-600 bg-zinc-900 p-6 shadow-lg shadow-slate-950/30">
            <h2 className="text-xl font-semibold text-orange-300">Fast Experience</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Our store is designed to help customers find products quickly and
              move through the buying journey without confusion.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-600 bg-zinc-900 p-6 shadow-lg shadow-slate-950/30">
            <h2 className="text-xl font-semibold text-orange-300">Customer Trust</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Clear product details, dependable service, and a clean interface
              are at the center of what we build.
            </p>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-orange-500/20 bg-linear-to-r from-black to-orange-950/70 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">
            We want ShopNest to be a place where customers can browse with
            confidence and discover products that fit their lifestyle. From the
            homepage to the product page, every part of the store is made to
            feel modern, practical, and easy to use.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
