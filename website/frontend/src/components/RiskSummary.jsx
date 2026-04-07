// components/RiskSummary.jsx
"use client";

export default function RiskSummary({ stats }) {
  if (!stats?.classification) return null;

  const c = stats.classification;

  const items = [
    { label: "Low", value: c.low, color: "bg-emerald-500" },
    { label: "Medium", value: c.medium, color: "bg-yellow-500" },
    { label: "High", value: c.high, color: "bg-red-500" },
  ];

  return (
    <div className="border border-white/10 p-8">

      <p className="text-xs text-zinc-500 mb-6">RISK BREAKDOWN</p>

      <div className="space-y-5">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span>{(item.value * 100).toFixed(1)}%</span>
            </div>

            <div className="h-1 bg-white/10">
              <div
                className={`h-full ${item.color}`}
                style={{ width: `${item.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}