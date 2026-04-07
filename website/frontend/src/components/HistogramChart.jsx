// components/HistogramChart.jsx
"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function HistogramChart({ stats }) {
  if (!stats?.histogram) return null;

  const data = stats.histogram.map((v, i) => ({
    bin: `${(i * 0.1).toFixed(1)}`,
    count: v
  }));

  return (
    <div className="h-[300px]">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="bin" stroke="#6b7280" fontSize={11} />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000",
              border: "1px solid #333",
              fontSize: "12px"
            }}
          />
          <Bar dataKey="count" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}