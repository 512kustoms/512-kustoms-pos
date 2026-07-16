import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";

export default async function InvoicesPage() {
  const invoices = await prisma.sale.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Invoices
            </h1>

            <p className="text-zinc-400">
              {invoices.length} invoices
            </p>

          </div>

        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

          <table className="w-full">

            <thead className="bg-zinc-950">

              <tr className="text-left text-zinc-400">

                <th className="px-4 py-3">Invoice</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {invoices.map((invoice) => (

                <tr
                  key={invoice.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800"
                >

                  <td className="px-4 py-3 font-semibold text-white">
                    {invoice.invoiceNumber}
                  </td>

                  <td className="px-4 py-3">
                    {invoice.createdAt.toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {invoice.items.length}
                  </td>

                  <td className="px-4 py-3">
                    {invoice.paymentMethod}
                  </td>

                  <td className="px-4 py-3 text-right font-semibold text-green-500">
                    ${invoice.total.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="rounded bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

              {invoices.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-12 text-center text-zinc-500"
                  >
                    No invoices found.
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