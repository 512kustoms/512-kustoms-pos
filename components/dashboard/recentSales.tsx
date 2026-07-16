import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function RecentSales() {
  const sales = await prisma.sale.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="rounded-xl bg-zinc-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold text-white">
          Recent Sales
        </h2>

        <Link
          href="/sales/history"
          className="text-violet-500 hover:text-violet-400"
        >
          View All
        </Link>

      </div>

      <div className="space-y-3">

        {sales.length === 0 && (
          <p className="text-zinc-500">
            No sales yet.
          </p>
        )}

        {sales.map((sale) => (

          <div
            key={sale.id}
            className="flex items-center justify-between rounded-lg bg-zinc-950 p-4"
          >

            <div>

              <p className="font-semibold text-white">
                {sale.invoiceNumber}
              </p>

              <p className="text-sm text-zinc-500">
                {sale.createdAt.toLocaleDateString()}
              </p>

            </div>

            <span className="font-bold text-green-500">
              ${sale.total.toFixed(2)}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}