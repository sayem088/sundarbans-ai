// components/RiskImage.jsx
"use client";

export default function RiskImage({ image }) {
  if (!image) return null;

  return (
    <div>

      <div className="mb-4">
        <h3 className="text-lg font-medium">Risk Map Output</h3>
        <p className="text-zinc-500 text-sm">
          Generated spatial prediction
        </p>
      </div>

      <div className="border border-white/10 p-4 bg-black">
        <img
          src={`http://127.0.0.1:8000/maps/${image}`}
          alt="Risk Map"
          className="w-full max-h-[600px] object-contain"
        />
      </div>

    </div>
  );
}