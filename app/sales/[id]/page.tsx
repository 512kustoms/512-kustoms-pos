import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SalePage({
  params,
}: Props) {
  const { id } = await params;

  const sale = await prisma.sale.findUnique({
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

  if (!sale) notFound();

  return (
    <AppShell>

      <div className="max-w-4xl space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            {sale.invoiceNumber}
          </h1>

          <p className="text-zinc-400">
            {sale.createdAt.toLocaleString()}
          </p>

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900">

          <table className="w-full">

            <thead>

              <tr>

                <th className="px-4 py-3 text-left">
                  Product
                </th>

                <th className="px-4 py-3 text-center">
                  Qty
                </th>

                <th className="px-4 py-3 text-right">
                  Price
                </th>

              </tr>

            </thead>

            <tbody>

              {sale.items.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-zinc-800"
                >

                  <td className="px-4 py-3">
                    {item.product.name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.quantity}
                  </td>

                  <td className="px-4 py-3 text-right">
                    ${item.price.toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="rounded-xl bg-zinc-900 p-6">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${sale.subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${sale.tax.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex justify-between border-t border-zinc-700 pt-4 text-2xl font-bold">
            <span>Total</span>
            <span>${sale.total.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <strong>Payment:</strong> {sale.paymentMethod}
          </div>

        </div>

      </div>

    </AppShell>
  );
}