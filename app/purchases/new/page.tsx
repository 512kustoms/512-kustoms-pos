import AppShell from "@/components/layout/appshell";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PurchaseForm from "@/components/purchases/purchaseForm";

export const dynamic = "force-dynamic";

export default async function NewPurchasePage() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      location: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AppShell>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            New Purchase Order
          </h1>

          <p className="text-zinc-400">
            Create a manual purchase order to restock inventory.
          </p>
        </div>

        <Link
          href="/purchases"
          className="rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700"
        >
          Back
        </Link>
      </div>

      <PurchaseForm products={products} />
    </AppShell>
  );
}