import AppShell from "@/components/layout/appshell";
import ProfitChart from "@/components/reports/profitChart";
import { prisma } from "@/lib/prisma";

export default async function ProfitReportsPage() {
  const purchases = await prisma.purchase.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const profitByDay = new Map<string, number>();

  for (const purchase of purchases) {
    const day = purchase.createdAt.toLocaleDateString();

    profitByDay.set(
      day,
      (profitByDay.get(day) ?? 0) + purchase.profit
    );
  }

  const chartData = Array.from(profitByDay.entries()).map(
    ([day, profit]) => ({
      day,
      profit,
    })
  );

  const vendorCost = purchases.reduce(
    (sum, purchase) => sum + purchase.subtotal,
    0
  );

  const shippingPaid = purchases.reduce(
    (sum, purchase) => sum + purchase.shipping,
    0
  );

  const grossProfit = purchases.reduce(
    (sum, purchase) => sum + purchase.profit,
    0
  );

  const revenue =
    vendorCost + shippingPaid + grossProfit;

  const margin =
    revenue > 0
      ? (grossProfit / revenue) * 100
      : 0;

  return (
    <AppShell>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Profit Reports
          </h1>

          <p className="mt-2 text-zinc-400">
            View business profit and expenses.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Gross Profit
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-500">
              ${grossProfit.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Vendor Cost
            </p>

            <h2 className="mt-3 text-4xl font-bold text-red-500">
              ${vendorCost.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Shipping Paid
            </p>

            <h2 className="mt-3 text-4xl font-bold text-orange-500">
              ${shippingPaid.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Profit Margin
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-400">
              {margin.toFixed(2)}%
            </h2>
          </div>

        </div>

        <ProfitChart data={chartData} />

        <div className="rounded-xl bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Purchase Profit History
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-zinc-700">

                  <th className="px-4 py-3 text-left text-zinc-400">
                    Purchase #
                  </th>

                  <th className="px-4 py-3 text-left text-zinc-400">
                    Supplier
                  </th>

                  <th className="px-4 py-3 text-right text-zinc-400">
                    Cost
                  </th>

                  <th className="px-4 py-3 text-right text-zinc-400">
                    Shipping
                  </th>

                  <th className="px-4 py-3 text-right text-zinc-400">
                    Profit
                  </th>

                </tr>

              </thead>

              <tbody>

                {purchases
                  .slice()
                  .reverse()
                  .map((purchase) => (

                    <tr
                      key={purchase.id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/40"
                    >

                      <td className="px-4 py-3 text-white">
                        {purchase.purchaseNumber}
                      </td>

                      <td className="px-4 py-3 text-zinc-300">
                        {purchase.supplier}
                      </td>

                      <td className="px-4 py-3 text-right text-red-400">
                        ${purchase.subtotal.toFixed(2)}
                      </td>

                      <td className="px-4 py-3 text-right text-orange-400">
                        ${purchase.shipping.toFixed(2)}
                      </td>

                      <td className="px-4 py-3 text-right font-bold text-green-500">
                        ${purchase.profit.toFixed(2)}
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