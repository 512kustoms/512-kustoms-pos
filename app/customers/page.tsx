import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      lastName: "asc",
    },
  });

  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Customers
            </h1>

            <p className="text-zinc-400">
              {customers.length} Customers
            </p>

          </div>

          <Link
            href="/customers/add"
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            + New Customer
          </Link>

        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

          <table className="w-full">

            <thead className="bg-zinc-950">

              <tr className="text-left text-zinc-400">

                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Vehicles</th>
                <th className="px-4 py-3 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {customers.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800"
                >

                  <td className="px-4 py-3 text-white font-semibold">
                    {customer.firstName} {customer.lastName}
                  </td>

                  <td className="px-4 py-3">
                    {customer.phone}
                  </td>

                  <td className="px-4 py-3">
                    {customer.email}
                  </td>

                  <td className="px-4 py-3">
                    0
                  </td>

                  <td className="px-4 py-3 text-center">

                    <Link
                      href={`/customers/${customer.id}`}
                      className="rounded bg-violet-600 px-3 py-2 text-white hover:bg-violet-700"
                    >
                      Open
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </AppShell>
  );
}