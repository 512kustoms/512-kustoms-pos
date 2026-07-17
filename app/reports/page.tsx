import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ReportsPage() {
  const today = new Date();

  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const [
    todaySales,
    monthSales,
    purchases,
  ] = await Promise.all([
    prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startOfToday,
        },
      },
    }),

    prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),

    prisma.purchase.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    }),
  ]);

  const revenueToday = todaySales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const revenueMonth = monthSales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const profitMonth = purchases.reduce(
    (sum, purchase) => sum + purchase.profit,
    0
  );

  const vendorCostMonth = purchases.reduce(
    (sum, purchase) => sum + purchase.subtotal,
    0
  );

  const shippingMonth = purchases.reduce(
    (sum, purchase) => sum + purchase.shipping,
    0
  );

  const margin =
    revenueMonth > 0
      ? (profitMonth / revenueMonth) * 100
      : 0;

  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <h1 className="text-4xl font-bold text-white">
            Reports Dashboard
          </h1>

          <div className="flex gap-3">

            <Link
              href="/reports/sales"
              className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
            >
              Sales
            </Link>

            <Link
              href="/reports/profit"
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              Profit
            </Link>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Revenue Today
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-500">
              ${revenueToday.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Revenue This Month
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-500">
              ${revenueMonth.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Profit This Month
            </p>

            <h2 className="mt-3 text-4xl font-bold text-violet-500">
              ${profitMonth.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Vendor Cost
            </p>

            <h2 className="mt-3 text-4xl font-bold text-red-500">
              ${vendorCostMonth.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Shipping Paid
            </p>

            <h2 className="mt-3 text-4xl font-bold text-orange-500">
              ${shippingMonth.toFixed(2)}
            </h2>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Profit Margin
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-500">
              {margin.toFixed(2)}%
            </h2>
          </div>

        </div>

      </div>
    </AppShell>
  );
}