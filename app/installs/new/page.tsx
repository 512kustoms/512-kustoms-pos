import AppShell from "@/components/layout/appshell";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createInstallJob } from "@/app/actions/installJobs";

export default async function NewInstallPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      lastName: "asc",
    },
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              New Install Job
            </h1>

            <p className="text-zinc-400">
              Create a new installation ticket
            </p>

          </div>

          <Link
            href="/installs"
            className="rounded-lg bg-zinc-700 px-5 py-3 text-white hover:bg-zinc-600"
          >
            Back
          </Link>

        </div>

        <form
          action={createInstallJob}
          className="space-y-8"
        >

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Customer
            </h2>

            <select
              name="customerId"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            >
              <option value="">
                Walk-In Customer
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                >
                  {customer.firstName} {customer.lastName}
                </option>
              ))}

            </select>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Vehicle
            </h2>

            <input
              name="vehicle"
              placeholder="2021 Ram TRX"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Job
            </h2>

            <input
              name="title"
              placeholder="Install 4 8&quot; Subs and Amplifier"
              required
              className="mb-6 w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />

            <textarea
              name="notes"
              rows={6}
              placeholder="Customer requested..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="mb-6 text-2xl font-bold text-white">
              Labor
            </h2>

            <input
              type="number"
              step="0.01"
              name="laborCost"
              defaultValue={0}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
            />

          </div>

          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-8 py-4 font-bold text-white hover:bg-violet-700"
          >
            Create Install Job
          </button>

        </form>

      </div>
    </AppShell>
  );
}