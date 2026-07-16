import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const [
    products,
    customers,
    installJobs,
    sales,
  ] = await Promise.all([
    prisma.product.findMany(),
    prisma.customer.findMany(),
    prisma.installJob.findMany(),
    prisma.sale.findMany(),
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

  const lowStock = products.filter(
    (p) => p.quantity <= p.minimumStock
  );

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400">
          Welcome to 512 Kustoms Management
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-4 gap-6">

        <Card
          title="Products"
          value={products.length}
          color="text-violet-400"
        />

        <Card
          title="Customers"
          value={customers.length}
          color="text-cyan-400"
        />

        <Card
          title="Install Jobs"
          value={installJobs.length}
          color="text-orange-400"
        />

        <Card
          title="Sales"
          value={sales.length}
          color="text-green-400"
        />

      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="rounded-xl bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold text-white">
            Inventory Value
          </h2>

          <p className="text-4xl font-bold text-green-500">
            ${inventoryValue.toLocaleString()}
          </p>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold text-white">
            Retail Value
          </h2>

          <p className="text-4xl font-bold text-violet-500">
            ${retailValue.toLocaleString()}
          </p>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6">

          <h2 className="mb-4 text-xl font-bold text-white">
            Revenue
          </h2>

          <p className="text-4xl font-bold text-cyan-400">
            ${totalRevenue.toLocaleString()}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="rounded-xl bg-zinc-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold text-white">
              Low Stock
            </h2>

            <Link
              href="/inventory"
              className="text-violet-500"
            >
              View All
            </Link>

          </div>

          <div className="space-y-3">

            {lowStock.length === 0 && (
              <p className="text-zinc-500">
                Everything is stocked.
              </p>
            )}

            {lowStock.map((product) => (

              <div
                key={product.id}
                className="flex justify-between rounded-lg bg-zinc-950 p-3"
              >

                <span className="text-white">
                  {product.name}
                </span>

                <span className="text-red-500">
                  {product.quantity}
                </span>

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-bold text-white">
              Quick Actions
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <Link
              href="/sales"
              className="rounded-lg bg-violet-600 p-5 text-center font-semibold text-white hover:bg-violet-700"
            >
              New Sale
            </Link>

            <Link
              href="/inventory/add"
              className="rounded-lg bg-zinc-800 p-5 text-center text-white hover:bg-zinc-700"
            >
              Add Product
            </Link>

            <Link
              href="/customers/add"
              className="rounded-lg bg-zinc-800 p-5 text-center text-white hover:bg-zinc-700"
            >
              New Customer
            </Link>

            <Link
              href="/installs/new"
              className="rounded-lg bg-zinc-800 p-5 text-center text-white hover:bg-zinc-700"
            >
              New Install
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
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-zinc-900 p-6">

      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}