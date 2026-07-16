"use client";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    name: string;
    quantity: number;
  }[];
}

export default function TopProductsChart({
  data,
}: Props) {
  return (
    <div className="rounded-xl bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Inventory Levels
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid stroke="#3f3f46"/>

            <XAxis
              dataKey="name"
              stroke="#a1a1aa"
            />

            <YAxis stroke="#a1a1aa"/>

            <Tooltip/>

            <Bar
              dataKey="quantity"
              fill="#06b6d4"
              radius={[5,5,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}