// components/HighLowTables.jsx
"use client";

export default function HighLowTables({ high = [], low = [] }) {
  const sections = [
    { data: high, title: "High Risk (>70%)", accent: "text-red-400" },
    { data: low, title: "Low Risk (≤30%)", accent: "text-emerald-400" },
  ];

  return (
    <div className="space-y-12">

      <div>
        <h2 className="text-lg font-medium text-white">Risk Data Tables</h2>
        <p className="text-zinc-500 text-sm mt-1">
          Sampled coordinate-level risk values
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {sections.map((section, idx) => (
          <div key={idx} className="border border-white/10">

            <div className="flex justify-between px-6 py-4 border-b border-white/10">
              <h3 className={`text-sm ${section.accent}`}>
                {section.title}
              </h3>
              <span className="text-xs text-zinc-500">
                {section.data.length} points
              </span>
            </div>

            <div className="max-h-[420px] overflow-auto">
              <table className="w-full text-sm">
                <thead className="text-zinc-500 text-xs border-b border-white/10">
                  <tr>
                    <th className="text-left px-6 py-2">Lat</th>
                    <th className="text-left px-6 py-2">Lng</th>
                    <th className="text-right px-6 py-2">Risk</th>
                  </tr>
                </thead>

                <tbody>
                  {section.data.map((p, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="px-6 py-2 font-mono">
                        {p.lat.toFixed(4)}
                      </td>
                      <td className="px-6 py-2 font-mono">
                        {p.lng.toFixed(4)}
                      </td>
                      <td className="px-6 py-2 text-right">
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