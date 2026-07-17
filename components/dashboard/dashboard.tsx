import Link from "next/link";
import {
  Boxes,
  Users,
  DollarSign,
  PackageX,
  Wrench,
  ShoppingCart,
  Plus,
  ClipboardList,
  FileBarChart2,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const [products, customers, installJobs, sales] =
    await Promise.all([
      prisma.product.findMany(),
      prisma.customer.findMany(),
      prisma.installJob.findMany(),
      prisma.sale.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
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

  const revenue = sales.reduce(
    (sum, s) => sum + s.total,
    0
  );

  const lowStock = products.filter(
    (p) => p.quantity <= p.minimumStock
  );

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-zinc-400">
            512 Kustoms Management Dashboard
          </p>

        </div>

      </div>

      {/* KPI CARDS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Products"
          value={products.length}
          icon={<Boxes size={28} />}
          color="bg-violet-600"
        />

        <StatCard
          title="Customers"
          value={customers.length}
          icon={<Users size={28} />}
          color="bg-cyan-600"
        />

        <StatCard
          title="Install Jobs"
          value={installJobs.length}
          icon={<Wrench size={28} />}
          color="bg-orange-600"
        />

        <StatCard
          title="Sales"
          value={sales.length}
          icon={<ShoppingCart size={28} />}
          color="bg-green-600"
        />

      </div>

      {/* FINANCIALS */}

      <div className="grid gap-6 lg:grid-cols-3">

        <MoneyCard
          title="Inventory Value"
          value={inventoryValue}
          color="text-green-400"
        />

        <MoneyCard
          title="Retail Value"
          value={retailValue}
          color="text-violet-400"
        />

        <MoneyCard
          title="Revenue"
          value={revenue}
          color="text-cyan-400"
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* LOW STOCK */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-white">
              Low Stock
            </h2>

            <Link
              href="/inventory"
              className="text-violet-400 hover:text-violet-300"
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
                className="flex items-center justify-between rounded-xl bg-zinc-950 p-4"
              >

                <div>

                  <p className="font-semibold text-white">
                    {product.name}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {product.brand}
                  </p>

                </div>

                <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                  Qty {product.quantity}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

          <h2 className="mb-6 text-2xl font-bold text-white">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <QuickButton
              href="/sales"
              title="New Sale"
              icon={<DollarSign size={22} />}
            />

            <QuickButton
              href="/inventory/add"
              title="Add Product"
              icon={<Plus size={22} />}
            />

            <QuickButton
              href="/customers/add"
              title="Customer"
              icon={<Users size={22} />}
            />

            <QuickButton
              href="/reports"
              title="Reports"
              icon={<FileBarChart2 size={22} />}
            />

            <QuickButton
              href="/purchases"
              title="Purchase Orders"
              icon={<ClipboardList size={22} />}
            />

            <QuickButton
              href="/inventory"
              title="Inventory"
              icon={<PackageX size={22} />}
            />

          </div>

        </div>

      </div>

      {/* RECENT SALES */}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Recent Sales
        </h2>

        <div className="space-y-3">

          {sales.map((sale) => (

            <div
              key={sale.id}
              className="flex items-center justify-between rounded-xl bg-zinc-950 p-4"
            >

              <div>

                <p className="font-semibold text-white">
                  {sale.invoiceNumber}
                </p>

                <p className="text-sm text-zinc-500">
                  {sale.paymentMethod}
                </p>

              </div>

              <p className="text-xl font-bold text-green-400">
                ${sale.total.toFixed(2)}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div className={`${color} rounded-xl p-4 text-white`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

function MoneyCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className={`mt-4 text-4xl font-bold ${color}`}>
        ${value.toLocaleString()}
      </h2>

    </div>
  );
}

function QuickButton({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl bg-zinc-950 p-5 text-white transition hover:bg-violet-600"
    >
      {icon}
      <span className="font-semibold">{title}</span>
    </Link>
  );
}