import Link from "next/link";
import { prisma } from "@/lib/prisma";
import RevenueChart from "./revenueChart";
import TopProductsChart from "./topProductsChart";
import RecentSales from "./recentSales";
import ActiveJobs from "./activeJobs";

export default async function Dashboard() {
  const [
    products,
    customers,
    installJobs,
    sales,
  ] = await Promise.all([
    prisma.product.findMany({
      orderBy: {
        quantity: "desc",
      },
      take: 10,
    }),

    prisma.customer.findMany(),

    prisma.installJob.findMany(),

    prisma.sale.findMany({
      orderBy: {
        createdAt: "asc",
      },
    }),
  ]);

  const inventoryValue = products.reduce(
    (sum, p) => sum + p.cost * p.quantity,
    0
  );

  const retailValue = products.reduce(
    (sum, p) => sum + p.retail * p.quantity,
    0
  );

  const totalRevenue = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalProfit = retailValue - inventoryValue;

  const lowStock = products.filter(
    (p) => p.quantity <= p.minimumStock
  );

  const revenueChart = sales.map((sale) => ({
    day: sale.createdAt.toLocaleDateString(),
    revenue: sale.total,
  }));

  const inventoryChart = products.map((product) => ({
    name:
      product.name.length > 15
        ? product.name.substring(0, 15) + "..."
        : product.name,
    quantity: product.quantity,
  }));

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-zinc-400">
            Welcome to 512 Kustoms Management
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/sales"
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            New Sale
          </Link>

          <Link
            href="/installs/new"
            className="rounded-lg bg-zinc-800 px-5 py-3 text-white hover:bg-zinc-700"
          >
            New Install
          </Link>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6">

        <Card
          title="Products"
          value={products.length.toString()}
          color="text-violet-400"
        />

        <Card
          title="Customers"
          value={customers.length.toString()}
          color="text-cyan-400"
        />

        <Card
          title="Install Jobs"
          value={installJobs.length.toString()}
          color="text-orange-400"
        />

        <Card
          title="Sales"
          value={sales.length.toString()}
          color="text-green-400"
        />

      </div>

      {/* Financial Cards */}

      <div className="grid grid-cols-3 gap-6">

        <MoneyCard
          title="Inventory Value"
          amount={inventoryValue}
          color="text-green-500"
        />

        <MoneyCard
          title="Revenue"
          amount={totalRevenue}
          color="text-cyan-400"
        />

        <MoneyCard
          title="Potential Profit"
          amount={totalProfit}
          color="text-violet-500"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-6">

        <RevenueChart
          data={revenueChart}
        />

        <TopProductsChart
          data={inventoryChart}
        />

      </div>
            {/* Activity */}

      <div className="grid grid-cols-2 gap-6">

        <RecentSales />

        <ActiveJobs />

      </div>

      {/* Bottom Section */}

      <div className="grid grid-cols-2 gap-6">

        <div className="rounded-xl bg-zinc-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold text-white">
              Low Stock Products
            </h2>

            <Link
              href="/inventory"
              className="text-violet-500 hover:text-violet-400"
            >
              View Inventory
            </Link>

          </div>

          <div className="space-y-3">

            {lowStock.length === 0 && (

              <p className="text-zinc-500">
                Everything is fully stocked.
              </p>

            )}

            {lowStock.map((product) => (

              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg bg-zinc-950 p-4"
              >

                <div>

                  <p className="font-semibold text-white">
                    {product.name}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {product.brand}
                  </p>

                </div>

                <span className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                  Qty {product.quantity}
                </span>

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6">

          <h2 className="mb-6 text-xl font-bold text-white">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <Link
              href="/sales"
              className="rounded-lg bg-violet-600 p-5 text-center font-semibold text-white transition hover:bg-violet-700"
            >
              New Sale
            </Link>

            <Link
              href="/inventory/add"
              className="rounded-lg bg-zinc-800 p-5 text-center font-semibold text-white transition hover:bg-zinc-700"
            >
              Add Product
            </Link>

            <Link
              href="/customers/add"
              className="rounded-lg bg-zinc-800 p-5 text-center font-semibold text-white transition hover:bg-zinc-700"
            >
              New Customer
            </Link>

            <Link
              href="/installs/new"
              className="rounded-lg bg-zinc-800 p-5 text-center font-semibold text-white transition hover:bg-zinc-700"
            >
              New Install
            </Link>

            <Link
              href="/reports"
              className="rounded-lg bg-zinc-800 p-5 text-center font-semibold text-white transition hover:bg-zinc-700"
            >
              Reports
            </Link>

            <Link
              href="/sales/history"
              className="rounded-lg bg-zinc-800 p-5 text-center font-semibold text-white transition hover:bg-zinc-700"
            >
              Sales History
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 p-6 shadow-lg">

      <p className="text-sm uppercase tracking-wide text-zinc-400">
        {title}
      </p>

      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}

function MoneyCard({
  title,
  amount,
  color,
}: {
  title: string;
  amount: number;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 p-6 shadow-lg">

      <p className="text-sm uppercase tracking-wide text-zinc-400">
        {title}
      </p>

      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        $
        {amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h2>

    </div>
  );
}