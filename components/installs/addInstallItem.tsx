"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import ProductSearch from "./productSearch";
import { addInstallItem } from "@/app/actions/installJobs";

interface Props {
  installId: number;
  products: Product[];
}

export default function AddInstallItem({
  installId,
  products,
}: Props) {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Add Products
      </h2>

      <ProductSearch
        products={products}
        onSelect={(product) => setSelectedProduct(product)}
      />

      {selectedProduct && (
        <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-950 p-6">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold text-white">
                {selectedProduct.name}
              </h3>

              <p className="text-zinc-400">
                {selectedProduct.brand}
              </p>

            </div>

            <div className="text-right">

              <p className="text-2xl font-bold text-violet-500">
                ${selectedProduct.retail.toFixed(2)}
              </p>

              <p className="text-zinc-500">
                In Stock: {selectedProduct.quantity}
              </p>

            </div>

          </div>

          <form
            action={addInstallItem}
            className="mt-6 flex items-end gap-4"
          >

            <input
              type="hidden"
              name="installId"
              value={installId}
            />

            <input
              type="hidden"
              name="productId"
              value={selectedProduct.id}
            />

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Quantity
              </label>

              <input
                type="number"
                min={1}
                max={selectedProduct.quantity}
                name="quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
                className="w-32 rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"
              />

            </div>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
            >
              Add To Install
            </button>

          </form>

        </div>
      )}

    </div>
  );
}