import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import InventoryTable from "@/components/inventory/inventoryTable";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function InventoryPage({
  searchParams,
}: Props) {
  const { search } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search ?? "",
            mode: "insensitive",
          },
        },
        {
          brand: {
            contains: search ?? "",
            mode: "insensitive",
          },
        },
        {
          sku: {
            contains: search ?? "",
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Inventory
            </h1>

            <p className="text-zinc-400">
              {products.length} Products
            </p>

          </div>

          <Link
            href="/inventory/add"
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            + Add Product
          </Link>

        </div>

        <form>

          <input
            name="search"
            defaultValue={search}
            placeholder="Search product, brand or SKU..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
          />

        </form>

        <InventoryTable products={products} />

      </div>
    </AppShell>
  );
}