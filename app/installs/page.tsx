import Link from "next/link";
import AppShell from "@/components/layout/appshell";
import { prisma } from "@/lib/prisma";

export default async function InstallJobsPage() {
  const jobs = await prisma.installJob.findMany({
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Install Jobs
            </h1>

            <p className="text-zinc-400">
              {jobs.length} Active Jobs
            </p>

          </div>

          <Link
            href="/installs/new"
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
          >
            + New Install
          </Link>

        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">

          <table className="w-full">

            <thead className="bg-zinc-950">

              <tr className="text-left text-zinc-400">

                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Labor</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3"></th>

              </tr>

            </thead>

            <tbody>

              {jobs.map(job => (

                <tr
                  key={job.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800"
                >

                  <td className="px-4 py-3 text-white">
                    {job.customer
                      ? `${job.customer.firstName} ${job.customer.lastName}`
                      : "Walk In"}
                  </td>

                  <td className="px-4 py-3">
                    {job.vehicle}
                  </td>

                  <td className="px-4 py-3">
                    {job.status}
                  </td>

                  <td className="px-4 py-3">
                    ${job.laborCost.toFixed(2)}
                  </td>

                  <td className="px-4 py-3">
                    {job.createdAt.toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">

                    <Link
                      href={`/installs/${job.id}`}
                      className="rounded bg-violet-600 px-3 py-2 text-white"
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