import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";
import {
  addBrand,
  updateBrand,
  deleteBrand,
} from "@/app/actions/settings";

export default async function BrandSettingsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AppShell>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            Brand Management
          </h1>

          <p className="mt-2 text-zinc-400">
            Create, edit, and delete brands used throughout inventory.
          </p>
        </div>

        {/* Add Brand */}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-semibold text-white">
            Add Brand
          </h2>

          <form
            action={addBrand}
            className="flex gap-4"
          >

            <input
              type="text"
              name="name"
              required
              placeholder="Brand Name"
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
            />

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Add Brand
            </button>

          </form>

        </div>

        {/* Existing Brands */}

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

          <div className="border-b border-zinc-800 px-6 py-4">

            <h2 className="text-xl font-semibold text-white">
              Existing Brands
            </h2>

          </div>

          {brands.length === 0 ? (

            <div className="p-8 text-center text-zinc-500">
              No brands have been created yet.
            </div>

          ) : (

            brands.map((brand) => (

              <form
                key={brand.id}
                className="flex items-center gap-4 border-b border-zinc-800 p-5 transition hover:bg-zinc-800/40 last:border-b-0"
              >

                <input
                  type="hidden"
                  name="id"
                  value={brand.id}
                />

                <input
                  type="text"
                  name="name"
                  defaultValue={brand.name}
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                />

                <button
                  formAction={updateBrand}
                  className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
                >
                  Save
                </button>

                <button
                  formAction={deleteBrand}
                  className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>

              </form>

            ))

          )}

        </div>

      </div>
    </AppShell>
  );
}