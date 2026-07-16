import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";

export default async function SalesHistoryPage() {
  const sales = await prisma.sale.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
    },
  });

  return (
    <AppShell>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Sales History
          </h1>

          <p className="text-zinc-400">
            {sales.length} Sales
          </p>

        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

          <table className="w-full">

            <thead className="bg-zinc-950">

              <tr className="text-left text-zinc-400">

                <th className="px-4 py-3">
                  Invoice
                </th>

                <th className="px-4 py-3">
                  Date
                </th>

                <th className="px-4 py-3">
                  Items
                </th>

                <th className="px-4 py-3">
                  Payment
                </th>

                <th className="px-4 py-3 text-right">
                  Total
                </th>

                <th className="px-4 py-3 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {sales.map((sale) => (

                <tr
                  key={sale.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800"
                >

                  <td className="px-4 py-3 font-semibold text-white">
                    {sale.invoiceNumber}
                  </td>

                  <td className="px-4 py-3">
                    {sale.createdAt.toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {sale.items.length}
                  </td>

                  <td className="px-4 py-3">
                    {sale.paymentMethod}
                  </td>

                  <td className="px-4 py-3 text-right font-bold text-green-500">
                    ${sale.total.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <Link
                      href={`/sales/${sale.id}`}
                      className="rounded bg-violet-600 px-3 py-2 text-white hover:bg-violet-700"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

              {sales.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-12 text-center text-zinc-500"
                  >
                    No Sales Yet
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>
    </AppShell>
  );
}