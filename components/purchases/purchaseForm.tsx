"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { Product, Brand, Location } from "@prisma/client";
import { usePurchaseStore } from "@/store/purchaseStore";
import { createPurchase } from "@/app/actions/purchases";

type ProductWithRelations = Product & {
  brand: Brand | null;
  location: Location | null;
};

interface Props {
  products: ProductWithRelations[];
}

export default function PurchaseForm({ products }: Props) {
  const router = useRouter();

  const items = usePurchaseStore((state) => state.items);
  const addItem = usePurchaseStore((state) => state.addItem);
  const updateQuantity = usePurchaseStore((state) => state.updateQuantity);
  const updateUnitCost = usePurchaseStore((state) => state.updateUnitCost);
  const removeItem = usePurchaseStore((state) => state.removeItem);
  const clearItems = usePurchaseStore((state) => state.clearItems);
  const total = usePurchaseStore((state) => state.total());

  const [search, setSearch] = useState("");
  const [supplier, setSupplier] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredProducts = products.filter((product) => {
    const value = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(value) ||
      product.category.toLowerCase().includes(value) ||
      (product.brand?.name.toLowerCase().includes(value) ?? false) ||
      (product.supplier?.toLowerCase().includes(value) ?? false)
    );
  });

  async function handleSubmit() {
    if (items.length === 0 || !supplier.trim()) return;

    setSubmitting(true);

    await createPurchase(
      supplier,
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitCost: item.unitCost,
      })),
      notes
    );

    clearItems();

    setSupplier("");
    setNotes("");

    setSubmitting(false);

    router.push("/purchases");
  }

  return (
    <div className="grid grid-cols-12 gap-6">

      <div className="col-span-7 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-4 text-xl font-bold text-white">
          Select Products
        </h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
        />

        <div className="max-h-[500px] space-y-2 overflow-auto">

          {filteredProducts.map((product) => (

            <button
              key={product.id}
              type="button"
              onClick={() =>
                addItem({
                  productId: product.id,
                  name: product.name,
                  unitCost: product.cost,
                })
              }
              className="flex w-full items-center justify-between rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-left transition hover:border-violet-500 hover:bg-zinc-800"
            >

              <div>

                <p className="font-semibold text-white">
                  {product.name}
                </p>

                <p className="text-sm text-zinc-500">
                  {product.brand?.name ?? "No Brand"}
                </p>

              </div>

              <p className="text-zinc-400">
                Last Cost: ${product.cost.toFixed(2)}
              </p>

            </button>

          ))}

        </div>

      </div>

      <div className="col-span-5 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-4 text-xl font-bold text-white">
          Restock Order
        </h2>

        <div className="mb-4">

          <label className="mb-1 block text-sm text-zinc-400">
            Supplier
          </label>

          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            placeholder="Supplier name"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
          />

        </div>

        <div className="mb-4 max-h-[350px] space-y-3 overflow-auto">

          {items.length === 0 && (
            <p className="rounded-lg bg-zinc-950 p-4 text-center text-zinc-500">
              No items added.
            </p>
          )}

          {items.map((item) => (

            <div
              key={item.productId}
              className="rounded-lg border border-zinc-700 bg-zinc-950 p-3"
            >

              <div className="mb-2 flex items-center justify-between">

                <p className="font-semibold text-white">
                  {item.name}
                </p>

                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex-1">

                  <label className="mb-1 block text-xs text-zinc-500">
                    Qty
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.productId,
                        Number(e.target.value)
                      )
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-center text-white"
                  />

                </div>

                <div className="flex-1">

                  <label className="mb-1 block text-xs text-zinc-500">
                    Unit Cost
                  </label>

                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.unitCost}
                    onChange={(e) =>
                      updateUnitCost(
                        item.productId,
                        Number(e.target.value)
                      )
                    }
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-2 text-center text-white"
                  />

                </div>

                <div className="flex-1 text-right">

                  <label className="mb-1 block text-xs text-zinc-500">
                    Line Total
                  </label>

                  <p className="font-bold text-green-500">
                    $
                    {(item.quantity * item.unitCost).toFixed(2)}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        <div className="mb-4">

          <label className="mb-1 block text-sm text-zinc-400">
            Notes
          </label>

          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
          />

        </div>

        <div className="mb-4 flex justify-between border-t border-zinc-700 pt-4 text-2xl font-bold">

          <span className="text-white">
            Total
          </span>

          <span className="text-green-500">
            ${total.toFixed(2)}
          </span>

        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            items.length === 0 ||
            !supplier.trim() ||
            submitting
          }
          className="w-full rounded-lg bg-violet-600 py-4 font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Record Purchase"}
        </button>

      </div>

    </div>
  );
}