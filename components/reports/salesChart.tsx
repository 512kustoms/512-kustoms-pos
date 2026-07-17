"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    day: string;
    sales: number;
  }[];
}

export default function SalesChart({ data }: Props) {
  return (
    <div className="h-96 rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Sales
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#3f3f46" />

          <XAxis
            dataKey="day"
            stroke="#a1a1aa"
          />

          <YAxis stroke="#a1a1aa" />

          <Tooltip />

          <Bar
            dataKey="sales"
            fill="#7c3aed"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}