import AppShell from "@/components/layout/appshell";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function PurchasesPage() {
  const purchases = await prisma.purchase.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Purchase Orders
          </h1>

          <p className="text-zinc-400">
            Restock orders and dropship purchases
          </p>
        </div>

        <Link
          href="/purchases/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          + New Purchase
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr className="text-left text-zinc-300">
              <th className="px-4 py-3">PO #</th>
              <th className="px-4 py-3">Supplier</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-zinc-500"
                >
                  No purchase orders found.
                </td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    <Link
  href={`/purchases/${purchase.id}`}
  className="font-medium text-blue-400 hover:underline"
>
  {purchase.purchaseNumber}
</Link>
                  </td>

                  <td className="px-4 py-3 text-zinc-300">
                    {purchase.supplier}
                  </td>

                  <td className="px-4 py-3 text-zinc-300">
                    {purchase.items.length}
                  </td>

                  <td className="px-4 py-3 text-green-400">
                    $
                    {purchase.total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td className="px-4 py-3 text-zinc-400">
                    {purchase.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}