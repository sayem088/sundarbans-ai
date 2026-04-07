// components/AutoPredict.jsx
"use client";
import { useState } from "react";
import { Play, Calendar, Loader2 } from "lucide-react";
import axios from "axios";

export default function AutoPredict({ coords, setResult }) {
  const [start, setStart] = useState("2025-02-01");
  const [end, setEnd] = useState("2025-02-08");
  const [loading, setLoading] = useState(false);   // ← Now internal state

  const handleRun = async () => {
    if (!coords || coords.length === 0) {
      alert("Please draw a polygon on the map first!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        coords,
        start,
        end,
      });

      console.log("✅ Prediction successful:", res.data);
      setResult(res.data);
    } catch (error) {
      console.error("❌ Prediction error:", error);
      alert(`Error: ${error.response?.data?.error || error.message || "Failed to connect to server"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-end gap-6 bg-zinc-950/70 border border-emerald-900/30 rounded-3xl p-8 backdrop-blur-xl">
      <div className="flex-1 flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
            <Calendar size={18} /> Start Date
          </div>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
            <Calendar size={18} /> End Date
          </div>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl px-6 py-4 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleRun}
        disabled={loading || !coords}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-zinc-700 disabled:to-zinc-700 px-12 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 transition-all active:scale-95 disabled:cursor-not-allowed min-w-[200px]"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Analyzing Mangrove...
          </>
        ) : (
          <>
            <Play className="w-6 h-6" />
            RUN PREDICTION
          </>
        )}
      </button>
    </div>
  );
}