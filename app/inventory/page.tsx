import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import InventoryTable from "@/components/inventory/inventoryTable";
import { prisma } from "@/lib/prisma";

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
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

        <InventoryTable products={products} />
      </div>
    </AppShell>
  );
}