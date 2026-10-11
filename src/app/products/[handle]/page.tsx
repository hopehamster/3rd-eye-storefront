import { sdk } from "@/lib/medusa";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { products } = await sdk.store.product.list({ handle });
  const product = products[0];

  if (!product) notFound();

  const variant = product.variants?.[0];
  const price = variant?.prices?.[0];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
      <header className="border-b border-purple-800/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-purple-300 hover:text-purple-200">
            ← Back to shop
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-purple-900/20 rounded-lg flex items-center justify-center">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-8xl opacity-20">👁️</span>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl text-purple-300 mb-6">
            {price ? `$${(price.amount / 100).toFixed(2)}` : "Price on request"}
          </p>
          <p className="text-purple-200/70 mb-8">{product.description}</p>

          <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold transition">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
