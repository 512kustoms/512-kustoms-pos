import AppShell from "@/components/layout/appshell";
import SalesChart from "@/components/reports/salesChart";
import { prisma } from "@/lib/prisma";

export default async function ReportsPage() {

  const sales = await prisma.sale.findMany({
    orderBy:{
      createdAt:"asc",
    },
  });

  const chartData = sales.map((sale)=>({

    day: sale.createdAt.toLocaleDateString(),

    sales: sale.total,

  }));

  return (

    <AppShell>

      <div className="space-y-8">

        <h1 className="text-4xl font-bold text-white">
          Reports
        </h1>

        <SalesChart
          data={chartData}
        />

      </div>

    </AppShell>

  );
}