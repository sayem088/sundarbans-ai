// app/documentation/page.jsx
// app/documentation/page.jsx
'use client';

import Link from 'next/link';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-6 hidden md:block sticky top-20 h-[calc(100vh-80px)]">

        <h2 className="text-sm text-zinc-500 mb-6 tracking-widest">
          DOCUMENTATION
        </h2>

        <nav className="space-y-4 text-sm">

          <a href="#overview" className="block text-white/80 hover:text-white">Overview</a>
          <a href="#quickstart" className="block text-white/80 hover:text-white">Quick Start</a>
          <a href="#workflow" className="block text-white/80 hover:text-white">Workflow</a>
          <a href="#features" className="block text-white/80 hover:text-white">Features</a>
          <a href="#technical" className="block text-white/80 hover:text-white">Technical Details</a>

        </nav>
      </aside>


      {/* CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-24">

        {/* TITLE */}
        <div className="mb-16">
          <h1 className="text-5xl font-semibold tracking-tight mb-4">
            Documentation
          </h1>
          <p className="text-zinc-400 text-lg">
            Everything you need to understand and use SundarbanAI.
          </p>
        </div>


        {/* OVERVIEW */}
        <section id="overview" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Overview</h2>

          <p className="text-zinc-400 leading-relaxed mb-4">
            SundarbanAI is a satellite-driven risk intelligence platform designed to analyze
            environmental conditions in mangrove ecosystems.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            It combines Google Earth Engine, Sentinel satellite imagery, and machine learning
            to generate spatial risk predictions.
          </p>
        </section>


        {/* QUICK START */}
        <section id="quickstart" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Quick Start</h2>

          <div className="space-y-4 text-zinc-400">

            <p><span className="text-white">1.</span> Navigate to <Link href="/analysis" className="text-emerald-400">/analysis</Link></p>
            <p><span className="text-white">2.</span> Draw an area on the map</p>
            <p><span className="text-white">3.</span> Select a date range</p>
            <p><span className="text-white">4.</span> Run prediction</p>

          </div>
        </section>


        {/* WORKFLOW */}
        <section id="workflow" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Workflow</h2>

          <div className="space-y-6 text-zinc-400">

            <div>
              <h3 className="text-white font-medium mb-1">1. Area Selection</h3>
              <p>User defines region using polygon tools.</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-1">2. Data Retrieval</h3>
              <p>Sentinel-1 (VV) and Sentinel-2 (B3, B4, B8) data fetched from Google Earth Engine.</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-1">3. Feature Extraction</h3>
              <p>NDVI, NDWI, and radar backscatter are computed.</p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-1">4. Prediction</h3>
              <p>Random Forest model generates pixel-wise risk classification.</p>
            </div>

          </div>
        </section>


        {/* FEATURES */}
        <section id="features" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Features</h2>

          <ul className="space-y-4 text-zinc-400 list-disc list-inside">
            <li>Interactive polygon-based area selection</li>
            <li>Real-time satellite data processing</li>
            <li>NDVI / NDWI environmental indicators</li>
            <li>Machine learning-based risk prediction</li>
            <li>Heatmap visualization and analytics</li>
          </ul>
        </section>


        {/* TECHNICAL */}
        <section id="technical" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6">Technical Details</h2>

          <div className="space-y-4 text-zinc-400">

            <p><span className="text-white">Data Source:</span> Sentinel-1, Sentinel-2</p>
            <p><span className="text-white">Platform:</span> Google Earth Engine</p>
            <p><span className="text-white">Model:</span> Random Forest</p>
            <p><span className="text-white">Indices:</span> NDVI, NDWI</p>

          </div>
        </section>


        {/* FOOTER */}
        <div className="border-t border-white/10 pt-10 text-sm text-zinc-500">
          Version 1.0 • Last updated 2026
        </div>

      </main>
    </div>
  );
}