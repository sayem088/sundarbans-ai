// app/analysis/page.js
"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Leaf, AlertTriangle, TrendingUp } from "lucide-react";

import AutoPredict from "@/components/AutoPredict";
import HighLowTables from "@/components/HighLowTables";
import RiskCharts from "@/components/RiskCharts";
import RiskImage from "@/components/RiskImage";
import RiskSummary from "@/components/RiskSummary";
import TopHotspots from "@/components/TopHotspots";
import HistogramChart from "@/components/HistogramChart";

const MapView = dynamic(() => import("@/components/Map"), { ssr: false });

export default function AnalysisPage() {
  const [coords, setCoords] = useState(null);
  const [result, setResult] = useState(null);

  const heatData = useMemo(() => {
    if (!result?.risk_map || !coords?.[0]) return [];

    const mapData = result.risk_map;
    const polygon = coords[0];

    const lats = polygon.map(c => c[1]);
    const lngs = polygon.map(c => c[0]);

    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);

    const rows = mapData.length;
    const cols = mapData[0]?.length || 0;
    const points = [];
    const step = Math.max(1, Math.floor(Math.sqrt(rows * cols) / 85));

    for (let i = 0; i < rows; i += step) {
      for (let j = 0; j < cols; j += step) {
        const val = mapData[i][j];
        if (val == null || val < 0.05) continue;
        const lat = maxLat - (i / (rows - 1)) * (maxLat - minLat);
        const lng = minLng + (j / (cols - 1)) * (maxLng - minLng);
        points.push({ lat, lng, risk: Number(val) });
      }
    }
    return points.slice(0, 8000);
  }, [result?.risk_map, coords]);

  const { high, low } = useMemo(() => ({
    high: heatData.filter(p => p.risk > 0.7),
    low: heatData.filter(p => p.risk <= 0.3)
  }), [heatData]);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-5xl font-bold tracking-tight">Risk Analysis Dashboard</h1>
          <p className="text-zinc-400 mt-2">Draw a polygon on the map and run AI prediction</p>
        </div>

        {/* Map */}
        <div className="relative h-[620px] rounded-3xl overflow-hidden border border-emerald-900/40 mb-12">
          <MapView setCoords={setCoords} heatData={heatData} />
          <div className="absolute bottom-6 left-6 text-sm bg-black/70 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-emerald-900/50">
            Draw polygon on map to select analysis area
          </div>
        </div>

        {/* Controls */}
        <div className="mb-16">
          <AutoPredict 
            coords={coords} 
            setResult={setResult} 
          />
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-zinc-950 to-black border border-emerald-800/40 rounded-3xl p-10">
                <TrendingUp className="text-emerald-400 mb-4" size={32} />
                <p className="text-emerald-400/70 text-sm">AVERAGE RISK</p>
                <h2 className="text-7xl font-semibold mt-2">
                  {(result.stats.mean_risk * 100).toFixed(1)}%
                </h2>
              </div>

              <div className="bg-gradient-to-br from-zinc-950 to-black border border-red-800/40 rounded-3xl p-10">
                <AlertTriangle className="text-red-400 mb-4" size={32} />
                <p className="text-red-400/70 text-sm">HIGH RISK AREA</p>
                <h2 className="text-7xl font-semibold mt-2 text-red-400">
                  {(result.stats.high_risk_ratio * 100).toFixed(1)}%
                </h2>
              </div>

              <RiskSummary stats={result.stats} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-10">
                <h3 className="text-lg text-emerald-400 mb-6">Risk Distribution</h3>
                <RiskCharts stats={result.stats} />
              </div>
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-10">
                <h3 className="text-lg text-emerald-400 mb-6">Probability Histogram</h3>
                <HistogramChart stats={result.stats} />
              </div>
            </div>

            <TopHotspots points={heatData} />
            <HighLowTables high={high.slice(0, 40)} low={low.slice(0, 40)} />
            <RiskImage image={result.image_file} />
          </motion.div>
        )}
      </div>
    </div>
  );
}