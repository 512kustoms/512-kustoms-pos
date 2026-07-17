import AppShell from "@/components/layout/appshell";
import PurchaseForm from "@/components/purchases/purchaseForm";
import { prisma } from "@/lib/prisma";

export default async function NewPurchasePage() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <AppShell>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          New Restock Order
        </h1>
        <p className="text-zinc-400">
          Record a bulk inventory purchase
        </p>
      </div>

      <PurchaseForm products={products} />
    </AppShell>
  );
}