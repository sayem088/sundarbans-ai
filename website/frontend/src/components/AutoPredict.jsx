// components/AutoPredict.jsx
"use client";
import { useState } from "react";
import { Play, Loader2 } from "lucide-react";
import axios from "axios";

export default function AutoPredict({ coords, setResult }) {
  const [start, setStart] = useState("2025-02-01");
  const [end, setEnd] = useState("2025-02-08");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!coords || coords.length === 0) {
      alert("Draw area first");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        coords,
        start,
        end,
      });

      setResult(res.data);
    } catch (error) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 border border-white/10 px-6 py-4">

      {/* DATE INPUTS */}
      <div className="flex gap-3 w-full md:w-auto">

        <input
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="bg-black border border-white/10 px-4 py-2 text-sm outline-none"
        />

        <input
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="bg-black border border-white/10 px-4 py-2 text-sm outline-none"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={handleRun}
        disabled={loading || !coords}
        className="ml-auto bg-white text-black px-6 py-2 text-sm font-medium flex items-center gap-2 disabled:opacity-40"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Running
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Run Analysis
          </>
        )}
      </button>
    </div>
  );
}