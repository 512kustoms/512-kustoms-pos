"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: number;
  name: string;
  brand: string;
  sku: string;
  barcode: string | null;
  retail: number;
  quantity: number;
}

interface Props {
  products: Product[];
}

export default function ProductSearch({
  products,
}: Props) {
  const [search, setSearch] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const filtered = useMemo(() => {
    if (!search) return products;

    const value = search.toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(value) ||
      product.brand.toLowerCase().includes(value) ||
      product.sku.toLowerCase().includes(value) ||
      (product.barcode ?? "").includes(value)
    );
  }, [products, search]);

  return (
    <div className="space-y-4">

      <input
        placeholder="Search product, SKU or barcode..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
      />

      <div className="max-h-[600px] space-y-2 overflow-y-auto">

        {filtered.map((product) => (

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
            className="flex w-full items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:border-violet-500 hover:bg-zinc-800"
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

              <p className="text-xl font-bold text-green-500">
                ${product.retail.toFixed(2)}
              </p>

              <p
                className={
                  product.quantity <= 0
                    ? "text-red-500 text-sm"
                    : "text-zinc-400 text-sm"
                }
              >
                Stock: {product.quantity}
              </p>

            </div>

          </button>

        ))}

        {filtered.length === 0 && (
          <div className="rounded-lg bg-zinc-900 p-6 text-center text-zinc-500">
            No products found.
          </div>
        )}

      </div>

    </div>
  );
}