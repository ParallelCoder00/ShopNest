import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import { useNavigate, Link } from 'react-router-dom';

const statusClass = {
  Delivered: 'bg-emerald-500/10 text-emerald-300',
  Shipped: 'bg-blue-500/10 text-blue-300',
  Pending: 'bg-amber-500/10 text-amber-300',
};

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok) {
          const orderList = Array.isArray(data) ? data : data.data || [];
          setOrders(orderList);
        } else {
          if (res.status === 401) {
            logout();
            navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <main className="mx-auto min-h-[80vh] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-zinc-800 pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-orange-400">Account</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">My Profile</h2>
            <div className="mt-5 space-y-2 text-sm text-zinc-400 sm:text-base">
              <p>
                <span className="font-semibold text-zinc-200">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold text-zinc-200">Email:</span> {user.email}
              </p>
            </div>
            <span className="mt-4 inline-flex rounded-lg bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-300">
              Account Type: {user.role?.toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-fit rounded-lg bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-red-400"
          >
            Logout
          </button>
        </div>

        <div className="pt-6">
          <h3 className="text-2xl font-semibold text-white">Order History</h3>

          {loading ? (
            <p className="mt-5 text-sm text-zinc-400">Fetching your orders...</p>
          ) : orders.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-10 text-center">
              <p className="text-sm text-zinc-400">You haven't placed any orders yet.</p>
              <Link
                to="/shop"
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-400"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {orders.map((order) => {
                const totalAmount = Number(order.totalAmount || 0);
                const orderStatus = order.status || 'Pending';

                return (
                  <article
                    key={order._id}
                    className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-2 text-sm text-zinc-400">
                      <p>
                        Order ID: <span className="text-white">{order._id}</span>
                      </p>
                      <p>
                        Placed On:{' '}
                        <span className="text-white">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </p>
                      <p>
                        Total: <span className="font-semibold text-emerald-300">₹{totalAmount.toFixed(2)}</span>
                      </p>
                    </div>
                    <span
                      className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                        statusClass[orderStatus] || 'bg-amber-500/10 text-amber-300'
                      }`}
                    >
                      {orderStatus}
                    </span>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
