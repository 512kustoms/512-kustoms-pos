"use client";

import { useState } from "react";
import { Product } from "@prisma/client";
import { useCartStore } from "@/store/cartStore";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
      />

      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <button
            key={product.id}
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.retail,
                quantity: 1,
              })
            }
            className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-left transition hover:border-violet-500 hover:bg-zinc-800"
          >
            <h2 className="font-semibold text-white">
              {product.name}
            </h2>

            <p className="text-sm text-zinc-400">
              {product.brand}
            </p>

            <p className="mt-3 text-xl font-bold text-violet-500">
              ${product.retail.toFixed(2)}
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              Qty: {product.quantity}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}