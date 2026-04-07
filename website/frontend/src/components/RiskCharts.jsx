// components/RiskCharts.jsx
"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RiskCharts({ stats }) {
  if (!stats?.classification) return <p className="text-zinc-500">No classification data</p>;

  const c = stats.classification;
  const data = [
    { name: "Low Risk", value: c.low * 100, color: "#22c55e" },
    { name: "Medium Risk", value: c.medium * 100, color: "#eab308" },
    { name: "High Risk", value: c.high * 100, color: "#ef4444" },
  ];

  return (
    <div className="h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}