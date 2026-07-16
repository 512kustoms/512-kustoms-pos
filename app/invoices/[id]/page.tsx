import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/layout/appshell";
import PrintButton from "@/components/invoices/printButton";
import { prisma } from "@/lib/prisma";
import "./print.css";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvoicePage({
  params,
}: Props) {
  const { id } = await params;

  const invoice = await prisma.sale.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!invoice) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Invoice
            </h1>

            <p className="text-zinc-400">
              {invoice.invoiceNumber}
            </p>

          </div>

          <div className="flex gap-3">

            <PrintButton />

            <Link
              href="/invoices"
              className="rounded-lg bg-zinc-800 px-5 py-3 font-semibold text-white hover:bg-zinc-700"
            >
              Back
            </Link>

          </div>

        </div>

        <div
          id="invoice"
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10"
        >

          <div className="flex justify-between">

            <div>

              <h2 className="text-5xl font-bold text-violet-500">
                512 Kustoms
              </h2>

              <p className="mt-2 text-zinc-400">
                Car Audio • Security • Accessories
              </p>

              <p className="text-zinc-400">
                Phone: (737) 900-2906
              </p>

            </div>

            <div className="text-right">

              <h3 className="text-2xl font-bold text-white">
                INVOICE
              </h3>

              <div className="mt-6 space-y-2">

                <p>
                  <span className="font-semibold">
                    Number:
                  </span>{" "}
                  {invoice.invoiceNumber}
                </p>

                <p>
                  <span className="font-semibold">
                    Date:
                  </span>{" "}
                  {invoice.createdAt.toLocaleDateString()}
                </p>

                <p>
                  <span className="font-semibold">
                    Payment:
                  </span>{" "}
                  {invoice.paymentMethod}
                </p>

              </div>

            </div>

          </div>

          <div className="my-10 h-px bg-zinc-800" />

          <div className="grid grid-cols-2 gap-12">

            <div>

              <h3 className="mb-3 text-lg font-bold text-white">
                Bill To
              </h3>

              {invoice.customer ? (
                <>

                  <p className="text-lg text-white">
                    {invoice.customer.firstName}{" "}
                    {invoice.customer.lastName}
                  </p>

                  <p className="text-zinc-400">
                    {invoice.customer.phone}
                  </p>

                  {invoice.customer.email && (
                    <p className="text-zinc-400">
                      {invoice.customer.email}
                    </p>
                  )}

                </>
              ) : (
                <p className="text-zinc-500">
                  Walk-In Customer
                </p>
              )}

            </div>

            <div className="text-right">

              <h3 className="mb-3 text-lg font-bold text-white">
                Shop Information
              </h3>

              <p>512 Kustoms</p>

              <p>Car Audio & Accessories</p>

              <p>Austin, Texas</p>

            </div>

          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800">

            <table className="w-full">

              <thead className="bg-zinc-950">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Product
                  </th>

                  <th className="px-5 py-4 text-center">
                    Qty
                  </th>

                  <th className="px-5 py-4 text-right">
                    Price
                  </th>

                  <th className="px-5 py-4 text-right">
                    Total
                  </th>

                </tr>

              </thead>

              <tbody>

                {invoice.items.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t border-zinc-800"
                  >

                    <td className="px-5 py-4">
                      {item.product.name}
                    </td>

                    <td className="px-5 py-4 text-center">
                      {item.quantity}
                    </td>

                    <td className="px-5 py-4 text-right">
                      ${item.price.toFixed(2)}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold">
                      $
                      {(item.quantity * item.price).toFixed(2)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div className="mt-10 flex justify-end">

            <div className="w-80 rounded-xl bg-zinc-950 p-6">

              <div className="mb-3 flex justify-between">

                <span>Subtotal</span>

                <span>
                  ${invoice.subtotal.toFixed(2)}
                </span>

              </div>

              <div className="mb-3 flex justify-between">

                <span>Tax</span>

                <span>
                  ${invoice.tax.toFixed(2)}
                </span>

              </div>

              <div className="mt-5 border-t border-zinc-700 pt-5">

                <div className="flex justify-between text-3xl font-bold">

                  <span>Total</span>

                  <span className="text-green-500">
                    ${invoice.total.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-16 text-center text-sm text-zinc-500">

            Thank you for choosing 512 Kustoms!

          </div>

        </div>

      </div>
    </AppShell>
  );
}