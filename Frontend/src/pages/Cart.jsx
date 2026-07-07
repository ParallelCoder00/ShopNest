import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = Number(item?.price ?? 0);
    const safePrice = Number.isFinite(price) ? price : 0;
    return acc + safePrice * Number(item?.qty ?? 1);
  }, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + Number(item?.qty ?? 1), 0);

  return (
    <main className="mx-auto min-h-[80vh] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400">Your bag</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Shopping Cart</h2>
        </div>
        <Link to="/shop" className="text-sm font-semibold text-orange-300 transition hover:text-orange-200">
          Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-6 py-14 text-center shadow-xl shadow-black/20">
          <h3 className="text-2xl font-semibold text-white">Your cart is empty</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
            Looks like nothing has made it here yet. Browse the shop and add your favorite products.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-400"
          >
            Go Shopping
          </Link>
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {cartItems.map((item) => (
              <article
                key={item._id}
                className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 shadow-lg shadow-black/10 sm:grid-cols-[140px_1fr]"
              >
                <img
                  src={item.imageUrl || '/main_logo.png'}
                  alt={item.name}
                  className="h-36 w-full rounded-xl bg-zinc-800 object-cover sm:h-full"
                />
                <div className="flex flex-col justify-between gap-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                      <p className="mt-1 text-base font-medium text-orange-300">₹{Number(item?.price ?? 0).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="w-fit text-sm font-semibold text-zinc-400 transition hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex h-11 items-center overflow-hidden rounded-lg border border-zinc-700 bg-zinc-950">
                      <button
                        onClick={() => handleUpdateQty(item, item.qty - 1)}
                        className="h-full w-11 text-lg font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className="min-w-12 px-4 text-center text-sm font-semibold text-white">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQty(item, item.qty + 1)}
                        className="h-full w-11 text-lg font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-medium text-zinc-300">
                      Subtotal <span className="text-white">₹{(Number(item?.price ?? 0) * Number(item?.qty ?? 1)).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/20 lg:sticky lg:top-6">
            <h3 className="text-xl font-semibold text-white">Order Summary</h3>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-zinc-800 pt-4">
                <div className="flex items-center justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Cart;
