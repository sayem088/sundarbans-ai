// app/about/page.jsx
import { MapPin, Calendar, User } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">

      <div className="max-w-6xl mx-auto px-6">

        {/* HERO */}
        <section className="text-center mb-24">
          <p className="text-emerald-400 text-sm tracking-widest uppercase mb-6">
            About the Platform
          </p>

          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight mb-6">
            Intelligence for the <br />
            <span className="text-emerald-400">Sundarbans</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A satellite-driven system designed to monitor, analyze, and predict environmental risk in the world’s largest mangrove ecosystem.
          </p>
        </section>


        {/* PROBLEM → SOLUTION */}
        <section className="grid md:grid-cols-2 gap-16 mb-28">

          {/* Problem */}
          <div>
            <p className="text-emerald-400 text-xs tracking-widest mb-4">
              THE CHALLENGE
            </p>

            <h2 className="text-3xl font-semibold mb-6">
              A fragile ecosystem under pressure
            </h2>

            <div className="space-y-5 text-zinc-400 leading-relaxed">
              <p>
                The Sundarbans acts as a natural shield against cyclones and coastal flooding, 
                yet it is increasingly vulnerable to climate change, salinity intrusion, and human impact.
              </p>
              <p>
                Monitoring these changes using traditional methods is slow, fragmented, and often reactive.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div>
            <p className="text-emerald-400 text-xs tracking-widest mb-4">
              THE APPROACH
            </p>

            <h2 className="text-3xl font-semibold mb-6">
              Data-driven environmental intelligence
            </h2>

            <div className="space-y-5 text-zinc-400 leading-relaxed">
              <p>
                SundarbanAI integrates satellite data pipelines with machine learning models 
                to deliver fast, spatially-aware risk predictions.
              </p>
              <p>
                Users can define an area and timeframe to generate real-time insights, 
                including vegetation health, water dynamics, and risk classification.
              </p>
            </div>
          </div>

        </section>


        {/* SYSTEM FLOW (MINIMAL + CLEAN) */}
        <section className="mb-28">

          <h2 className="text-3xl font-semibold text-center mb-16">
            System Workflow
          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-center">

            {[
              { num: "01", title: "Define Area" },
              { num: "02", title: "Select Timeframe" },
              { num: "03", title: "Process Satellite Data" },
              { num: "04", title: "Generate Risk Output" }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-green-200/40 mb-4">
                  {item.num}
                </div>
                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
              </div>
            ))}

          </div>

        </section>


        {/* TECH STRIP */}
        <section className="border-y border-white/10 py-10 text-center text-sm text-zinc-400 tracking-wide mb-28">
          Google Earth Engine • Sentinel-1 • Sentinel-2 • NDVI • NDWI • Random Forest
        </section>


        {/* DEVELOPER */}
        <section className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="text-emerald-400 text-xs tracking-widest mb-4">
              CREATOR
            </p>

            <h2 className="text-4xl font-semibold mb-6">
              Built by SAM
            </h2>

            <p className="text-zinc-400 leading-relaxed mb-6">
              This platform was developed to bridge the gap between advanced geospatial technologies 
              and real-world environmental decision-making.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              The goal is simple — transform complex satellite data into clear, actionable insights 
              that support conservation and climate resilience.
            </p>

            <div className="flex flex-wrap gap-6 mt-10 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Dhaka, Bangladesh
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                2026
              </div>
            </div>
          </div>

          {/* Right (Visual Block instead of cartoon card) */}
          <div className=" flex items-center justify-center text-zinc-600 text-sm">
            {/* [ System Visualization / Map Preview / Future Graphic ] */}
            <img src="/about.png" className='h-86'></img>
          </div>

        </section>


        {/* FOOTER NOTE (CLEAN) */}
        <div className="text-center mt-28 text-zinc-600 text-sm">
          Designed for environmental intelligence and coastal resilience
        </div>

      </div>
    </div>
  );
}