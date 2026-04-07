// app/analysis/page.js
"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";

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
    const step = Math.max(1, Math.floor(Math.sqrt(rows * cols) / 90));

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
    <div className="min-h-screen bg-black text-white pt-26">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <h1 className="text-4xl font-semibold tracking-tight">
          Risk Analysis
        </h1>
        <p className="text-zinc-500 mt-1">
          Define area → Run model → Analyze outputs
        </p>
      </div>

      {/* CONTROL BAR */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <AutoPredict coords={coords} setResult={setResult} />
      </div>

      {/* MAP (PRIMARY FOCUS) */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="h-[620px] border border-white/10 relative">
          <MapView setCoords={setCoords} heatData={heatData} />

          <div className="absolute bottom-4 left-4 text-xs bg-black/70 px-4 py-2 border border-white/10">
            Draw polygon to begin analysis
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 space-y-16 pb-20"
        >

          {/* METRICS */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="border border-white/10 p-8">
              <TrendingUp className="text-emerald-400 mb-4" size={28} />
              <p className="text-xs text-zinc-500">AVERAGE RISK</p>
              <h2 className="text-5xl mt-2 font-semibold">
                {(result.stats.mean_risk * 100).toFixed(1)}%
              </h2>
            </div>

            <div className="border border-white/10 p-8">
              <AlertTriangle className="text-red-400 mb-4" size={28} />
              <p className="text-xs text-zinc-500">HIGH RISK AREA</p>
              <h2 className="text-5xl mt-2 font-semibold text-red-400">
                {(result.stats.high_risk_ratio * 100).toFixed(1)}%
              </h2>
            </div>

            <RiskSummary stats={result.stats} />
          </div>
          {/* CHARTS */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border border-white/10 p-8">
              <h3 className="text-sm text-zinc-500 mb-6">Risk Distribution</h3>
              <RiskCharts stats={result.stats} />
            </div>

            <div className="border border-white/10 p-8">
              <h3 className="text-sm text-zinc-500 mb-6">Histogram</h3>
              <HistogramChart stats={result.stats} />
            </div>
          </div>
          {/* HOTSPOTS */}
          <div>
            <h3 className="text-sm text-zinc-500 mb-6">High Risk Zones</h3>
            <TopHotspots points={heatData} />
          </div>
          {/* TABLES */}
          <div>
            <h3 className="text-sm text-zinc-500 mb-6">Data Tables</h3>
            <HighLowTables high={high.slice(0, 40)} low={low.slice(0, 40)} />
          </div>
          {/* IMAGE */}
          <div>
            <h3 className="text-sm text-zinc-500 mb-6">Exported Risk Map</h3>
            <RiskImage image={result.image_file} />
          </div>

        </motion.div>
      )}
    </div>
  );
}