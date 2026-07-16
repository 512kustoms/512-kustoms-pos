"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    day: string;
    revenue: number;
  }[];
}

export default function RevenueChart({ data }: Props) {
  return (
    <div className="rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Revenue
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#3f3f46" />

            <XAxis
              dataKey="day"
              stroke="#a1a1aa"
            />

            <YAxis stroke="#a1a1aa" />

            <Tooltip />

            <Area
              dataKey="revenue"
              stroke="#7c3aed"
              fill="url(#revenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}