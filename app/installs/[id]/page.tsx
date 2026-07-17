import AppShell from "@/components/layout/appshell";
import AddInstallItem from "@/components/installs/addInstallItem";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InstallJobPage({
  params,
}: Props) {
  const { id } = await params;

  const job = await prisma.installJob.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      customer: true,
      items: {
        include: {
          product: {
            include: {
              brand: true,
              location: true,
            },
          },
        },
      },
    },
  });

  if (!job) notFound();

  const products = await prisma.product.findMany({
    where: {
      quantity: {
        gt: 0,
      },
    },
    include: {
      brand: true,
      location: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const partsTotal = job.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const total = partsTotal + job.laborCost;

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            {job.title}
          </h1>

          <p className="text-zinc-400">
            {job.vehicle}
          </p>
        </div>

        <AddInstallItem
          installId={job.id}
          products={products}
        />

        <div className="rounded-xl bg-zinc-900">
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
              {job.items.map((item) => (
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
                    $
                    {(item.unitPrice * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl bg-zinc-900 p-6">
          <div className="flex justify-between">
            <span>Parts</span>

            <span>
              ${partsTotal.toFixed(2)}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span>Labor</span>

            <span>
              ${job.laborCost.toFixed(2)}
            </span>
          </div>

          <div className="mt-6 flex justify-between border-t border-zinc-700 pt-4 text-2xl font-bold">
            <span>Total</span>

            <span>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}