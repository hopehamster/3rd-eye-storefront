"use client";

import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-purple-200/60 mb-8">
            Add some spiritual tools to get started.
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
        </h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white/5 rounded-lg p-4 border border-purple-800/20"
            >
              <div className="w-20 h-20 bg-purple-900/20 rounded flex items-center justify-center shrink-0">
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-3xl opacity-20">👁️</span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-purple-300">
                  ${(item.price / 100).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded bg-purple-800/30 hover:bg-purple-700/50 transition"
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded bg-purple-800/30 hover:bg-purple-700/50 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/5 rounded-lg p-6 border border-purple-800/20">
          <div className="flex justify-between text-lg mb-4">
            <span>Subtotal</span>
            <span className="font-bold">${(total / 100).toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-lg font-semibold transition"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/"
            className="block text-center mt-4 text-purple-300 hover:text-purple-200 text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
