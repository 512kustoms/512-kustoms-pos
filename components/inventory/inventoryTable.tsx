"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { Product, Brand, Location } from "@prisma/client";
import Link from "next/link";
import { deleteProduct } from "../../app/actions/products";

type ProductWithRelations = Product & {
  brand: Brand | null;
  location: Location | null;
};

interface Props {
  products: ProductWithRelations[];
}

export default function InventoryTable({ products }: Props) {
  async function removeProduct(id: number) {
    if (!confirm("Delete this product?")) return;

    await deleteProduct(id);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="sticky top-0 bg-zinc-950">

            <tr>

              <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-300">
                Product
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-300">
                Brand
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-300">
                Category
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold text-zinc-300">
                Location
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-zinc-300">
                Qty
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-zinc-300">
                Cost
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-zinc-300">
                Retail
              </th>

              <th className="px-4 py-4 text-right text-sm font-semibold text-zinc-300">
                Profit
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-zinc-300">
                Status
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold text-zinc-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => {
              const profit = product.retail - product.cost;

              const margin =
                product.cost > 0
                  ? (profit / product.cost) * 100
                  : 0;

              return (
                <tr
                  key={product.id}
                  className="border-t border-zinc-800 transition-colors hover:bg-zinc-800/60"
                >

                  <td className="px-4 py-4">

                    <div className="font-semibold text-white">
                      {product.name}
                    </div>

                  </td>

                  <td className="px-4 py-4 text-zinc-300">
                    {product.brand?.name ?? "No Brand"}
                  </td>

                  <td className="px-4 py-4 text-zinc-300">
                    {product.category}
                  </td>

                  <td className="px-4 py-4 text-zinc-300">
                    {product.location?.name ?? "-"}
                  </td>

                  <td className="px-4 py-4 text-center">

                    {product.quantity <= product.minimumStock ? (
                      <span className="font-bold text-red-400">
                        {product.quantity}
                      </span>
                    ) : (
                      <span className="font-bold text-green-400">
                        {product.quantity}
                      </span>
                    )}

                  </td>

                  <td className="px-4 py-4 text-right text-zinc-300">
                    ${product.cost.toFixed(2)}
                  </td>

                  <td className="px-4 py-4 text-right font-semibold text-white">
                    ${product.retail.toFixed(2)}
                  </td>

                  <td className="px-4 py-4 text-right">

                    <div className="font-semibold text-green-400">
                      ${profit.toFixed(2)}
                    </div>

                    <div className="text-xs text-zinc-500">
                      {margin.toFixed(0)}%
                    </div>

                  </td>

                  <td className="px-4 py-4 text-center">

                    {product.quantity <= product.minimumStock ? (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                        LOW STOCK
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                        IN STOCK
                      </span>
                    )}

                  </td>

                  <td className="px-4 py-4">

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/inventory/edit/${product.id}`}
                        className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => removeProduct(product.id)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

            {products.length === 0 && (
              <tr>

                <td
                  colSpan={10}
                  className="py-16 text-center text-zinc-500"
                >
                  No products found.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}