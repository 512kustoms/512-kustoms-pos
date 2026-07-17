import AppShell from "@/components/layout/appshell";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { receivePurchase } from "@/app/actions/purchases";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PurchaseDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const purchase = await prisma.purchase.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!purchase) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            {purchase.purchaseNumber}
          </h1>

          <p className="text-zinc-400">
            {purchase.supplier}
          </p>
        </div>

        <Link
          href="/purchases"
          className="rounded-lg bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700"
        >
          Back
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            purchase.status === "RECEIVED"
              ? "bg-green-600 text-white"
              : purchase.status === "CANCELLED"
              ? "bg-red-600 text-white"
              : "bg-yellow-600 text-white"
          }`}
        >
          {purchase.status}
        </span>

        {purchase.status === "PENDING" && (
          <form
            action={async () => {
              "use server";
              await receivePurchase(purchase.id);
            }}
          >
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
            >
              Receive Inventory
            </button>
          </form>
        )}
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Supplier
          </p>

          <p className="mt-2 text-xl font-semibold text-white">
            {purchase.supplier}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Total
          </p>

          <p className="mt-2 text-xl font-semibold text-green-400">
            $
            {purchase.total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Items
          </p>

          <p className="mt-2 text-xl font-semibold text-white">
            {purchase.items.length}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Date
          </p>

          <p className="mt-2 text-xl font-semibold text-white">
            {purchase.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="px-4 py-3 text-left text-zinc-300">
                Product
              </th>

              <th className="px-4 py-3 text-left text-zinc-300">
                Qty
              </th>

              <th className="px-4 py-3 text-left text-zinc-300">
                Unit Cost
              </th>

              <th className="px-4 py-3 text-left text-zinc-300">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {purchase.items.map((item) => (
              <tr
                key={item.id}
                className="border-t border-zinc-800"
              >
                <td className="px-4 py-3 text-white">
                  {item.product.name}
                </td>

                <td className="px-4 py-3 text-zinc-300">
                  {item.quantity}
                </td>

                <td className="px-4 py-3 text-zinc-300">
                  $
                  {item.unitCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>

                <td className="px-4 py-3 text-green-400">
                  $
                  {(item.quantity * item.unitCost).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {purchase.notes && (
        <div className="mt-8 rounded-xl bg-zinc-900 p-5">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Notes
          </h2>

          <p className="text-zinc-300">
            {purchase.notes}
          </p>
        </div>
      )}
    </AppShell>
  );
}