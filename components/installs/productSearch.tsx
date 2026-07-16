"use client";

import { useMemo, useState } from "react";
import type { Product } from "@prisma/client";

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function ProductSearch({
  products,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return products;

    return products.filter((product) => {
      const value = search.toLowerCase();

      return (
        product.name.toLowerCase().includes(value) ||
        product.brand.toLowerCase().includes(value) ||
        product.sku.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  return (
    <div className="space-y-4">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
      />

      <div className="max-h-80 overflow-y-auto rounded-lg border border-zinc-800">

        {filtered.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelect(product)}
            className="flex w-full justify-between border-b border-zinc-800 p-4 text-left hover:bg-zinc-800"
          >
            <div>

              <h3 className="font-semibold text-white">
                {product.name}
              </h3>

              <p className="text-sm text-zinc-500">
                {product.brand}
              </p>

            </div>

            <div className="text-right">

              <p className="font-bold text-violet-500">
                ${product.retail.toFixed(2)}
              </p>

              <p className="text-xs text-zinc-500">
                Qty {product.quantity}
              </p>

            </div>

          </button>
        ))}

      </div>

    </div>
  );
}