// components/TopHotspots.jsx
"use client";

export default function TopHotspots({ points = [] }) {
  const top = [...points].sort((a, b) => b.risk - a.risk).slice(0, 10);

  if (top.length === 0) return null;

  return (
    <div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-white">
          High Risk Hotspots
        </h3>
        <p className="text-zinc-500 text-sm">
          Top 10 highest risk coordinates
        </p>
      </div>

      <table className="w-full text-sm border border-white/10">
        <thead className="text-zinc-500 text-xs border-b border-white/10">
          <tr>
            <th className="px-4 py-2 text-left">Lat</th>
            <th className="px-4 py-2 text-left">Lng</th>
            <th className="px-4 py-2 text-right">Risk</th>
          </tr>
        </thead>

        <tbody>
          {top.map((p, i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="px-4 py-2 font-mono">{p.lat.toFixed(4)}</td>
              <td className="px-4 py-2 font-mono">{p.lng.toFixed(4)}</td>
              <td className="px-4 py-2 text-right text-red-400">
                {(p.risk * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}