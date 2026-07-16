"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "@prisma/client";
import Link from "next/link";
import { deleteProduct } from "../../app/actions/products";

interface Props {
  products: Product[];
}

export default function InventoryTable({ products }: Props) {
  async function removeProduct(id: number) {
    if (!confirm("Delete this product?")) return;

    await deleteProduct(id);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <table className="w-full">
        <thead className="bg-zinc-950">
          <tr className="text-left text-zinc-400">
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3 text-center">Qty</th>
            <th className="px-4 py-3 text-right">Cost</th>
            <th className="px-4 py-3 text-right">Retail</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-zinc-800 hover:bg-zinc-800"
            >
              <td className="px-4 py-3">{product.sku}</td>

              <td className="px-4 py-3 font-medium text-white">
                {product.name}
              </td>

              <td className="px-4 py-3">{product.brand}</td>

              <td className="px-4 py-3">{product.category}</td>

              <td className="px-4 py-3 text-center">
                {product.quantity}
              </td>

              <td className="px-4 py-3 text-right">
                ${product.cost.toFixed(2)}
              </td>

              <td className="px-4 py-3 text-right">
                ${product.retail.toFixed(2)}
              </td>

              <td className="px-4 py-3 text-center">
                {product.quantity <= product.minimumStock ? (
                  <span className="rounded bg-red-600 px-2 py-1 text-xs text-white">
                    LOW
                  </span>
                ) : (
                  <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
                    IN STOCK
                  </span>
                )}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">

                  <Link
                    href={`/inventory/edit/${product.id}`}
                    className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    onClick={() => removeProduct(product.id)}
                    className="rounded bg-red-600 p-2 text-white hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>
              </td>

            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="py-12 text-center text-zinc-500"
              >
                No products found.
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  );
}