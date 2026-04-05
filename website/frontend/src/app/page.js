"use client";

import Upload from "@/Upload/Upload";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3">
            🌿 Sundarbans AI
          </h1>
          <p className="text-xl text-zinc-400">
            Flood Prediction System
          </p>
        </div>

        <Upload setMessage={setMessage} setPreview={setPreview} />

        {/* Message */}
        {message && (
          <div className="mt-6 text-center text-lg">
            {message}
          </div>
        )}

        {/* ✅ IMAGE PREVIEW */}
        {preview && (
          <div className="mt-10">
            <h2 className="text-xl mb-4 text-center">Prediction Result</h2>
            <img
              src={preview}
              alt="Flood Prediction"
              className="rounded-xl border border-zinc-700 mx-auto"
            />
          </div>
        )}

      </div>
    </div>
  );
}