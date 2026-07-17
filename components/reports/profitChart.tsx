"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    day: string;
    profit: number;
  }[];
}

export default function ProfitChart({
  data,
}: Props) {
  return (
    <div className="h-96 rounded-xl bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Profit (Daily)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <CartesianGrid stroke="#3f3f46" />

          <XAxis
            dataKey="day"
            stroke="#a1a1aa"
          />

          <YAxis stroke="#a1a1aa" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="profit"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}