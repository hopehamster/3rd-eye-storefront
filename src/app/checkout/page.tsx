"use client";

import { useCart } from "@/lib/cart";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);

  if (items.length === 0 && !done) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/" className="text-purple-300 hover:text-purple-200">
            Continue shopping →
          </Link>
        </div>
      </main>
    );
  }

  if (done) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-3xl font-bold mb-4">Order placed!</h1>
          <p className="text-purple-200/60 mb-8">
            Thank you for your order. We'll send confirmation to {email}.
          </p>
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-lg font-semibold transition inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    // TODO: Integrate Stripe payment here
    // For now, simulate order placement
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setDone(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Contact & Shipping</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-800/30 text-white placeholder-purple-200/40 focus:border-purple-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-800/30 text-white placeholder-purple-200/40 focus:border-purple-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-800/30 text-white placeholder-purple-200/40 focus:border-purple-500 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-800/30 text-white placeholder-purple-200/40 focus:border-purple-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="ZIP"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-800/30 text-white placeholder-purple-200/40 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <p className="text-sm text-purple-200/50 mb-4">
                Payment via Stripe — coming soon. Orders are currently processed
                manually.
              </p>
              <button
                type="submit"
                disabled={placing}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-8 py-3 rounded-lg font-semibold transition"
              >
                {placing ? "Placing order..." : `Place Order — $${(total / 100).toFixed(2)}`}
              </button>
            </div>
          </form>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span className="text-purple-300">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-purple-800/30 mt-4 pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
