import AppShell from "@/components/layout/appshell";
import ProductGrid from "@/components/sales/productGrid";
import Cart from "@/components/sales/cart";
import { prisma } from "@/lib/prisma";

export default async function SalesPage() {
const products = await prisma.product.findMany({
  where: {
    quantity: {
      gt: 0,
    },
  },
  include: {
    brand: true,
    location: true,
  },
  orderBy: {
    name: "asc",
  },
});

const customers = await prisma.customer.findMany({
  orderBy: [
    {
      lastName: "asc",
    },
    {
      firstName: "asc",
    },
  ],
});

  return (
    <AppShell>
      <div className="grid h-full grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="col-span-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Point of Sale
              </h1>

              <p className="text-zinc-400">
                Search products and add them to the cart
              </p>
            </div>
          </div>

          <ProductGrid products={products} />
        </div>

        {/* Right Side */}
        <div className="col-span-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <Cart customers={customers} />
        </div>
      </div>
    </AppShell>
  );
}