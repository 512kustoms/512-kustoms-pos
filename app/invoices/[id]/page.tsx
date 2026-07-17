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
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Invoice
            </h1>

            <p className="mt-1 text-zinc-400">
              {invoice.invoiceNumber}
            </p>
          </div>

          <div className="flex gap-3">
            <PrintButton />

            <Link
              href="/invoices"
              className="rounded-xl bg-zinc-800 px-5 py-3 font-semibold text-white transition hover:bg-zinc-700"
            >
              Back
            </Link>
          </div>

        </div>

        <div
          id="invoice"
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 shadow-2xl"
        >

          <div className="flex items-start justify-between">

            <div>

              <h2 className="text-6xl font-black tracking-tight text-violet-500">
                512 Kustoms
              </h2>

              <p className="mt-3 text-lg text-zinc-300">
                Car Audio • Security • Accessories
              </p>

              <p className="mt-2 text-lg text-zinc-300">
                Phone: (737) 900-2906
              </p>

            </div>

            <div className="text-right">

              <h3 className="text-5xl font-black tracking-wide text-white">
                INVOICE
              </h3>

              <div className="mt-8 space-y-4 text-lg">

                <p className="text-white">
                  <span className="font-bold text-violet-400">
                    Number:
                  </span>{" "}
                  {invoice.invoiceNumber}
                </p>

                <p className="text-white">
                  <span className="font-bold text-violet-400">
                    Date:
                  </span>{" "}
                  {invoice.createdAt.toLocaleDateString()}
                </p>

                <p className="text-white">
                  <span className="font-bold text-violet-400">
                    Payment:
                  </span>{" "}
                  {invoice.paymentMethod}
                </p>

              </div>

            </div>

          </div>

          <div className="my-12 h-px bg-zinc-800" />

          <div className="grid grid-cols-2 gap-12">

            <div>

              <h3 className="mb-4 text-2xl font-bold text-violet-400">
                Bill To
              </h3>

              {invoice.customer ? (
                <>

                  <p className="text-2xl font-semibold text-white">
                    {invoice.customer.firstName}{" "}
                    {invoice.customer.lastName}
                  </p>

                  <p className="mt-2 text-zinc-300">
                    {invoice.customer.phone}
                  </p>

                  {invoice.customer.email && (
                    <p className="text-zinc-300">
                      {invoice.customer.email}
                    </p>
                  )}

                </>
              ) : (
                <p className="text-xl text-zinc-300">
                  Walk-In Customer
                </p>
              )}

            </div>

            <div className="text-right">

              <h3 className="mb-4 text-2xl font-bold text-violet-400">
                Shop Information
              </h3>

              <p className="text-xl text-white">
                512 Kustoms
              </p>

              <p className="text-zinc-300">
                Car Audio & Accessories
              </p>

              <p className="text-zinc-300">
                Austin, Texas
              </p>

            </div>

          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-800">

            <table className="w-full">

              <thead className="bg-zinc-950 text-violet-400">

                <tr>

                  <th className="px-6 py-5 text-left text-lg font-bold">
                    Product
                  </th>

                  <th className="px-6 py-5 text-center text-lg font-bold">
                    Qty
                  </th>

                  <th className="px-6 py-5 text-right text-lg font-bold">
                    Price
                  </th>

                  <th className="px-6 py-5 text-right text-lg font-bold">
                    Total
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-zinc-800">

                {invoice.items.map((item) => (

                  <tr
                    key={item.id}
                    className="transition hover:bg-zinc-800/40"
                  >

                    <td className="px-6 py-5 text-lg font-medium text-white">
                      {item.product.name}
                    </td>

                    <td className="px-6 py-5 text-center text-zinc-300">
                      {item.quantity}
                    </td>

                    <td className="px-6 py-5 text-right text-zinc-300">
                      ${item.price.toFixed(2)}
                    </td>

                    <td className="px-6 py-5 text-right text-lg font-bold text-white">
                      $
                      {(item.quantity * item.price).toFixed(2)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
          <div className="mt-12 flex justify-end">

            <div className="w-96 rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">

              <div className="mb-4 flex justify-between text-lg text-zinc-300">

                <span>Subtotal</span>

                <span className="font-semibold text-white">
                  ${invoice.subtotal.toFixed(2)}
                </span>

              </div>

              <div className="mb-4 flex justify-between text-lg text-zinc-300">

                <span>Tax</span>

                <span className="font-semibold text-white">
                  ${invoice.tax.toFixed(2)}
                </span>

              </div>

              <div className="border-t border-zinc-700 pt-6">

                <div className="flex items-center justify-between">

                  <span className="text-3xl font-bold text-white">
                    Total
                  </span>

                  <span className="text-4xl font-black text-green-400">
                    ${invoice.total.toFixed(2)}
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-950 p-8">

            <h3 className="mb-4 text-xl font-bold text-violet-400">
              Thank You!
            </h3>

            <p className="leading-8 text-zinc-300">
              Thank you for choosing <span className="font-semibold text-white">512 Kustoms</span>.
              We appreciate your business and look forward to serving you again.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6 text-center">

              <div className="rounded-xl bg-zinc-900 p-5">

                <p className="mb-2 text-sm uppercase tracking-widest text-zinc-500">
                  Phone
                </p>

                <p className="font-semibold text-white">
                  (737) 900-2906
                </p>

              </div>

              <div className="rounded-xl bg-zinc-900 p-5">

                <p className="mb-2 text-sm uppercase tracking-widest text-zinc-500">
                  Business
                </p>

                <p className="font-semibold text-white">
                  512 Kustoms
                </p>

              </div>

              <div className="rounded-xl bg-zinc-900 p-5">

                <p className="mb-2 text-sm uppercase tracking-widest text-zinc-500">
                  Location
                </p>

                <p className="font-semibold text-white">
                  Austin, Texas
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </AppShell>
  );
}