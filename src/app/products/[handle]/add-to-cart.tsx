"use client";

import { useCart } from "@/lib/cart";

export default function AddToCartButton({
  id,
  title,
  price,
  thumbnail,
}: {
  id: string;
  title: string;
  price: number;
  thumbnail?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, title, price, thumbnail })}
      className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-semibold transition"
    >
      Add to Cart
    </button>
  );
}
