import React from "react";

function ReturnPolicy() {
  return (
    <main className="min-h-[calc(100vh-10rem)] bg-black text-white">
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-orange-500/20 bg-neutral-950 p-8 shadow-xl shadow-black/40 sm:p-10">
          <span className="inline-flex rounded-full bg-orange-500/15 px-4 py-2 text-sm font-semibold text-orange-300">
            Return Policy
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Returns made simple, fair, and transparent.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-300">
            We want you to feel confident when shopping with ShopNest. If an
            item arrives damaged, incorrect, or does not meet the listed
            details, you can request a return according to the policy below.
          </p>
        </div>

        <div className="mt-10 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-xl font-semibold text-orange-300">
                Return Window
              </h2>
              <span className="rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-black">
                7 days
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Return requests should be raised within 7 days of delivery. Items
              must be unused, undamaged, and returned with original packaging
              wherever possible.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-orange-300">
              Eligible Returns
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Products may be eligible for return if they are damaged during
              delivery, different from the order, missing important parts, or
              significantly different from the product description.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-orange-300">
              Non-returnable Items
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Items that are used, altered, damaged after delivery, or missing
              original packaging may not qualify for return. Certain sale or
              clearance items may also be final sale.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-orange-300">
              Refund Process
            </h2>
            <p className="mt-3 text-sm leading-7 text-neutral-300">
              Once the returned item is received and inspected, the refund or
              replacement request will be processed. Refund timelines may vary
              based on the payment provider or bank.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ReturnPolicy;
