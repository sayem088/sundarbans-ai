// components/RiskSummary.jsx
"use client";

export default function RiskSummary({ stats }) {
  if (!stats?.classification) return null;

  const c = stats.classification;

  return (
    <div className="bg-gradient-to-br from-zinc-950 to-black border border-emerald-800/40 rounded-3xl p-10 flex flex-col justify-center">
      <p className="text-emerald-400/70 text-sm mb-6">RISK BREAKDOWN</p>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-emerald-400">Low Risk</span>
            <span>{(c.low * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.low * 100}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-yellow-400">Medium Risk</span>
            <span>{(c.medium * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${c.medium * 100}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-400">High Risk</span>
            <span>{(c.high * 100).toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: `${c.high * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}