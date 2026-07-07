import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context.jsx';
import { clearCart } from '../redux/cartSlice.js';

const inputClass =
  'h-12 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10';

const addressFields = [
  { name: 'fullName', placeholder: 'Full Name' },
  { name: 'street', placeholder: 'Street Address' },
  { name: 'city', placeholder: 'City' },
  { name: 'postalCode', placeholder: 'Postal Code' },
  { name: 'country', placeholder: 'Country' },
];

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const updateAddress = (name, value) => {
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const saveOrder = async (paymentId) => {
    const orderItems = cartItems.map((item) => ({
      product: item._id,
      quantity: item.qty,
      price: String(item.price),
    }));

    const shippingAddress = {
      fullname: address.fullName,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
    };

    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: orderItems,
        totalAmount: String(totalPrice),
        address: shippingAddress,
        paymentId,
      }),
    });

    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/order-success');
    } else {
      const errorData = await saveOrderRes.json().catch(() => ({}));
      alert(errorData.message || 'Order saving failed');
    }
  };

  const bypassPayment = async () => {
    await saveOrder('bypass_txn_' + Date.now());
  };

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const orderData = await orderRes.json();
      const paymentOrder = orderData.data || orderData;

      if (!orderRes.ok) {
        const fallback = window.confirm(
          'Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?'
        );
        if (fallback) {
          return bypassPayment();
        }
        return alert('Payment failed to initialize');
      }

      if (!window.Razorpay) {
        const fallback = window.confirm(
          'Razorpay script is not loaded. Use Student Bypass Mode to place test order?'
        );
        if (fallback) {
          return bypassPayment();
        }
        return alert('Payment failed to initialize');
      }

      const options = {
        key: 'rzp_test_dummykey123',
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: paymentOrder.id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            await saveOrder(response.razorpay_payment_id);
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999',
        },
        theme: {
          color: '#f97316',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      const fallback = window.confirm('Payment failed to initialize. Use Student Bypass Mode to place test order?');
      if (fallback) {
        await bypassPayment();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    handlePayment();
  };

  return (
    <main className="mx-auto min-h-[80vh] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-orange-400">Secure checkout</p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Checkout</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Add your shipping details and review your order before payment.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-6 py-14 text-center shadow-xl shadow-black/20">
          <h3 className="text-2xl font-semibold text-white">Your cart is empty</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
            Add products to your cart before continuing to checkout.
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
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-xl shadow-black/20 sm:p-6"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white">Shipping Address</h3>
              <p className="mt-2 text-sm text-zinc-400">Use the address where you want your order delivered.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {addressFields.map((field) => (
                <input
                  key={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  required
                  value={address[field.name]}
                  onChange={(e) => updateAddress(field.name, e.target.value)}
                  className={field.name === 'street' ? `${inputClass} sm:col-span-2` : inputClass}
                />
              ))}
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-400 sm:w-auto"
            >
              Pay Now
            </button>
          </form>

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
              <div className="flex items-center justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-emerald-300">Free</span>
              </div>
              <div className="border-t border-zinc-800 pt-4">
                <div className="flex items-center justify-between text-lg font-bold text-white">
                  <span>Total to Pay</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Checkout;
