import AppShell from "@/components/layout/appshell";
import SalesChart from "@/components/reports/salesChart";
import { prisma } from "@/lib/prisma";

export default async function ReportsPage() {
  const sales = await prisma.sale.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const groupedSales = new Map<string, number>();

  for (const sale of sales) {
    const day = sale.createdAt.toLocaleDateString();

    groupedSales.set(
      day,
      (groupedSales.get(day) ?? 0) + sale.total
    );
  }

  const chartData = Array.from(groupedSales.entries()).map(
    ([day, sales]) => ({
      day,
      sales,
    })
  );

  return (
    <AppShell>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-white">
          Reports
        </h1>

        <SalesChart data={chartData} />
      </div>
    </AppShell>
  );
}