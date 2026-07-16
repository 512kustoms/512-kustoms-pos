import AppShell from "@/components/layout/appshell";
import ProductGrid from "@/components/sales/productGrid";
import Cart from "@/components/sales/cart";
import { prisma } from "@/lib/prisma";

export default async function SalesPage() {
const products = await prisma.product.findMany({
  orderBy: {
    name: "asc",
  },
});

  return (
    <AppShell>
      <div className="grid h-full grid-cols-3 gap-6">

        <div className="col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <h1 className="mb-6 text-3xl font-bold text-white">
            Point of Sale
          </h1>

          <ProductGrid products={products} />

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <Cart />

        </div>

      </div>
    </AppShell>
  );
}