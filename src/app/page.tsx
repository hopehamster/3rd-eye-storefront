import { sdk } from "@/lib/medusa";
import Link from "next/link";

export default async function Home() {
  const { products } = await sdk.store.product.list({ limit: 20 });

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
      <header className="border-b border-purple-800/30">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-purple-400">3rd Eye</span> Supply
          </h1>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-purple-300">Shop</Link>
            <Link href="/cart" className="hover:text-purple-300">Cart</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Spiritual Tools & Crystals</h2>
          <p className="text-purple-200/70 text-lg">
            Orgone, crystals, and sacred objects for your journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group bg-white/5 rounded-lg overflow-hidden border border-purple-800/20 hover:border-purple-500/50 transition"
            >
              <div className="aspect-square bg-purple-900/20 flex items-center justify-center">
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl opacity-20">👁️</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold group-hover:text-purple-300 transition">
                  {product.title}
                </h3>
                <p className="text-purple-200/60 text-sm mt-1">
                  {product.variants?.[0]?.prices?.[0]
                    ? `$${(product.variants[0].prices[0].amount / 100).toFixed(2)}`
                    : "Price on request"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="border-t border-purple-800/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-purple-200/50 text-sm">
          © 2026 3rd Eye Supply. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

export const dynamic = "force-dynamic";
