"use client";

import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-purple-800/30">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-purple-400">3rd Eye</span> Supply
          </h1>
        </Link>
        <nav className="flex gap-6 text-sm items-center">
          <Link href="/" className="hover:text-purple-300">
            Shop
          </Link>
          <Link href="/cart" className="hover:text-purple-300 relative">
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-purple-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
