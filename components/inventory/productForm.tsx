"use client";

import type { Product } from "@prisma/client";
import {
  addProduct,
  updateProduct,
} from "../../app/actions/products";

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({
  product,
}: ProductFormProps) {

  const action = product ? updateProduct : addProduct;

  return (
    <form action={action} className="space-y-8">

      {product && (
        <input
          type="hidden"
          name="id"
          value={product.id}
        />
      )}

      {/* Product Information */}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Product Information
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Product Name
            </label>

            <input
              name="name"
              defaultValue={product?.name}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Brand
            </label>

            <input
              name="brand"
              defaultValue={product?.brand}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Category
            </label>

            <input
              name="category"
              defaultValue={product?.category}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              SKU
            </label>

            <input
              name="sku"
              defaultValue={product?.sku}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Barcode
            </label>

            <input
              name="barcode"
              defaultValue={product?.barcode ?? ""}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Supplier
            </label>

            <input
              name="supplier"
              defaultValue={product?.supplier ?? ""}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

        </div>

      </div>

      {/* Pricing */}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Pricing
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Cost
            </label>

            <input
              type="number"
              step="0.01"
              name="cost"
              defaultValue={product?.cost}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Retail
            </label>

            <input
              type="number"
              step="0.01"
              name="retail"
              defaultValue={product?.retail}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

        </div>

      </div>

      {/* Inventory */}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Inventory
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              defaultValue={product?.quantity}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Minimum Stock
            </label>

            <input
              type="number"
              name="minimumStock"
              defaultValue={product?.minimumStock}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Shelf Location
            </label>

            <input
              name="shelfLocation"
              defaultValue={product?.shelfLocation ?? ""}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />
          </div>

        </div>

      </div>

      <div className="flex justify-end gap-4">

        <button
          type="reset"
          className="rounded-lg bg-zinc-700 px-6 py-3 font-semibold text-white hover:bg-zinc-600"
        >
          Clear
        </button>

        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          {product ? "Update Product" : "Save Product"}
        </button>

      </div>

    </form>
  );
}