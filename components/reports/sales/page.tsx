import AppShell from "@/components/layout/appshell";
import SalesChart from "@/components/reports/salesChart";
import { prisma } from "@/lib/prisma";

export default async function SalesReportsPage() {
  const sales = await prisma.sale.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const salesByDay = new Map<string, number>();

  for (const sale of sales) {
    const day = sale.createdAt.toLocaleDateString();

    salesByDay.set(
      day,
      (salesByDay.get(day) ?? 0) + sale.total
    );
  }

  const chartData = Array.from(salesByDay.entries()).map(
    ([day, sales]) => ({
      day,
      sales,
    })
  );

  const revenue = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const orders = sales.length;

  const averageSale =
    orders > 0 ? revenue / orders : 0;

  return (
    <AppShell>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Sales Reports
          </h1>

          <p className="mt-2 text-zinc-400">
            View sales performance and revenue history.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-zinc-900 p-6">

            <p className="text-zinc-400">
              Total Revenue
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-500">
              ${revenue.toFixed(2)}
            </h2>

          </div>

          <div className="rounded-xl bg-zinc-900 p-6">

            <p className="text-zinc-400">
              Orders
            </p>

            <h2 className="mt-3 text-4xl font-bold text-violet-500">
              {orders}
            </h2>

          </div>

          <div className="rounded-xl bg-zinc-900 p-6">

            <p className="text-zinc-400">
              Average Sale
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-500">
              ${averageSale.toFixed(2)}
            </h2>

          </div>

        </div>

        <SalesChart data={chartData} />

        <div className="rounded-xl bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Recent Sales
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-zinc-700">

                  <th className="px-4 py-3 text-left text-zinc-400">
                    Invoice
                  </th>

                  <th className="px-4 py-3 text-left text-zinc-400">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-zinc-400">
                    Payment
                  </th>

                  <th className="px-4 py-3 text-right text-zinc-400">
                    Total
                  </th>

                </tr>

              </thead>

              <tbody>

                {sales
                  .slice()
                  .reverse()
                  .map((sale) => (

                    <tr
                      key={sale.id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/40"
                    >

                      <td className="px-4 py-3 text-white">
                        {sale.invoiceNumber}
                      </td>

                      <td className="px-4 py-3 text-zinc-300">
                        {sale.createdAt.toLocaleDateString()}
                      </td>

                      <td className="px-4 py-3 text-zinc-300">
                        {sale.paymentMethod}
                      </td>

                      <td className="px-4 py-3 text-right font-bold text-green-500">
                        ${sale.total.toFixed(2)}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </AppShell>
  );
}