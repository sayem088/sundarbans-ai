// components/HighLowTables.jsx
"use client";

export default function HighLowTables({ high = [], low = [] }) {
  const sections = [
    { 
      data: high, 
      title: "🔥 High Risk Areas (>70%)", 
      color: "text-red-400",
      countColor: "text-red-500"
    },
    { 
      data: low, 
      title: "✅ Low Risk Areas (≤30%)", 
      color: "text-emerald-400",
      countColor: "text-emerald-500"
    },
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-semibold text-emerald-400">Risk Area Details</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-medium ${section.color}`}>
                {section.title}
              </h3>
              <span className={`text-sm font-mono ${section.countColor}`}>
                {section.data.length} points
              </span>
            </div>

            <div className="max-h-[420px] overflow-auto custom-scrollbar">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-zinc-950 z-10">
                  <tr className="text-left text-zinc-400 border-b border-zinc-700">
                    <th className="pb-3 font-medium">Latitude</th>
                    <th className="pb-3 font-medium">Longitude</th>
                    <th className="pb-3 font-medium text-right">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {section.data.map((p, i) => (
                    <tr key={i} className="hover:bg-zinc-900/50 transition">
                      <td className="py-3 font-mono">{p.lat.toFixed(4)}</td>
                      <td className="py-3 font-mono">{p.lng.toFixed(4)}</td>
                      <td className="py-3 text-right font-medium">
                        {(p.risk * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}