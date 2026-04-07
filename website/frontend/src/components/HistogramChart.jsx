// components/HistogramChart.jsx
"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function HistogramChart({ stats }) {
  if (!stats?.histogram) return <p className="text-zinc-500">No histogram data available</p>;

  const data = stats.histogram.map((v, i) => ({
    bin: `${(i * 0.1).toFixed(1)} - ${((i + 1) * 0.1).toFixed(1)}`,
    count: v
  }));

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          <XAxis 
            dataKey="bin" 
            stroke="#4b5563" 
            fontSize={12}
          />
          <YAxis stroke="#4b5563" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#111827", 
              border: "1px solid #10b981",
              borderRadius: "8px" 
            }} 
          />
          <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}