// app/page.js
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO — VIDEO BACKGROUND */}
      <section className="relative h-screen flex items-center justify-center text-center">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/homevideo.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6">

          <p className="text-emerald-400 text-sm tracking-widest mb-6 uppercase">
            Mangrove Risk Intelligence Platform
          </p>

          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-none mb-8">
            Monitor. Predict.<br />
            <span className="text-emerald-400">Protect.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            AI-powered environmental intelligence for real-time mangrove risk analysis using satellite data.
          </p>

          <div className="flex items-center justify-center gap-6">

            <Link
              href="/analysis"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-4 transition-all"
            >
              Start Analysis <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/about"
              className="text-white/70 hover:text-white border-b border-white/30 hover:border-white transition"
            >
              Learn More
            </Link>

          </div>
        </div>
      </section>


      {/* STRIP — TRUST / TECH */}
      <section className="border-t border-white/10 py-10 text-center text-sm text-zinc-400 tracking-wide">
        Powered by Google Earth Engine • Sentinel-1 & Sentinel-2 • Machine Learning
      </section>


      {/* VALUE SECTION (NO CARDS, CLEAN GRID) */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12">

        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">
            Satellite Intelligence
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            High-resolution radar and optical data processed in real-time to monitor vegetation and water dynamics.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">
            Predictive Modeling
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            Machine learning models analyze environmental indicators to identify high-risk zones.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">
            Decision Support
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            Generate actionable insights, hotspot detection, and spatial risk visualization.
          </p>
        </div>

      </section>


      {/* FINAL CTA */}
      <section className="border-t border-white/10 py-24 text-center">

        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Start analyzing mangrove risk
        </h2>

        <p className="text-zinc-400 mb-10">
          Select an area. Choose a time range. Get instant insights.
        </p>

        <Link
          href="/analysis"
          className="bg-white text-black px-10 py-4 font-semibold hover:scale-105 transition"
        >
          Launch Platform
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="text-center py-10 border-t border-white/10 text-zinc-500 text-sm">
        SundarbanAI • Built for Climate Intelligence
      </footer>

    </div>
  );
}