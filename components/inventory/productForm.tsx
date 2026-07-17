"use client";

import type {
  Product,
  Brand,
  Location,
} from "@prisma/client";

import {
  addProduct,
  updateProduct,
} from "../../app/actions/products";

interface ProductFormProps {
  product?: Product;
  brands: Brand[];
  locations: Location[];
}

export default function ProductForm({
  product,
  brands,
  locations,
}: ProductFormProps) {

  const action = product
    ? updateProduct
    : addProduct;

  return (

    <form
      action={action}
      className="space-y-8"
    >

      {product && (

        <input
          type="hidden"
          name="id"
          value={product.id}
        />

      )}

      {/* PRODUCT INFORMATION */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Product Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Product Name */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Product Name
            </label>

            <input
              name="name"
              required
              defaultValue={product?.name}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            />

          </div>

          {/* Brand */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm text-zinc-400">
                Brand
              </label>

              <span className="text-xs text-violet-400">
                Managed List
              </span>

            </div>

            <select
              name="brandId"
              required
              defaultValue={product?.locationId?.toString() ?? ""}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            >

              <option value="">
                Select Brand
              </option>

              {brands.map((brand) => (

                <option
                  key={brand.id}
                  value={brand.id}
                >
                  {brand.name}
                </option>

              ))}

            </select>

          </div>

          {/* Category */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Category
            </label>

            <input
              name="category"
              required
              defaultValue={product?.category}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            />

          </div>

          {/* Supplier */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Supplier
            </label>

            <input
              name="supplier"
              defaultValue={product?.supplier ?? ""}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            />

          </div>

        </div>

      </div>
      {/* PRICING */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Pricing
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Cost
            </label>

            <input
              type="number"
              step="0.01"
              name="cost"
              required
              defaultValue={product?.cost}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Retail Price
            </label>

            <input
              type="number"
              step="0.01"
              name="retail"
              required
              defaultValue={product?.retail}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            />

          </div>

        </div>

      </div>

      {/* INVENTORY */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Inventory
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Quantity */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              required
              defaultValue={product?.quantity}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            />

          </div>

          {/* Minimum Stock */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              Minimum Stock
            </label>

            <input
              type="number"
              name="minimumStock"
              required
              defaultValue={product?.minimumStock}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            />

          </div>

          {/* Shelf Location */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm text-zinc-400">
                Shelf Location
              </label>

              <span className="text-xs text-violet-400">
                Managed List
              </span>

            </div>

            <select
              name="locationId"
              defaultValue={product?.locationId ?? ""}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-violet-500 focus:outline-none"
            >

              <option value="">
                No Location
              </option>

              {locations.map((location) => (

                <option
                  key={location.id}
                  value={location.id}
                >
                  {location.name}
                </option>

              ))}

            </select>

          </div>

        </div>

      </div>

      {/* BUTTONS */}

      <div className="flex items-center justify-end gap-4 border-t border-zinc-800 pt-6">

        <button
          type="reset"
          className="rounded-xl bg-zinc-700 px-6 py-3 font-semibold text-white transition hover:bg-zinc-600"
        >
          Reset
        </button>

        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          {product
            ? "Update Product"
            : "Save Product"}
        </button>

      </div>

    </form>

  );

}