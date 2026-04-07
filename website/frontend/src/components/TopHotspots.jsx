// components/TopHotspots.jsx
"use client";
export default function TopHotspots({ points = [] }) {
  const top = [...points]
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 10);

  if (top.length === 0) {
    return <p className="text-zinc-400">No hotspots detected.</p>;
  }

  return (
    <div>
      <h3 className="text-xl text-red-400 mb-3">🔥 Top 10 Hotspots</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-zinc-400 border-b border-zinc-700">
            <th className="pb-2">Latitude</th>
            <th className="pb-2">Longitude</th>
            <th className="pb-2">Risk</th>
          </tr>
        </thead>
        <tbody>
          {top.map((p, i) => (
            <tr key={i} className="border-b border-zinc-800 last:border-0">
              <td>{p.lat.toFixed(4)}</td>
              <td>{p.lng.toFixed(4)}</td>
              <td className="font-medium text-red-400">{(p.risk * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}