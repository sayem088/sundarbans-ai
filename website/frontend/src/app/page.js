// app/page.js
import Link from 'next/link';
import { Leaf, Satellite, Shield, TrendingUp, User, Calendar, MapPin } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="pt-32 pb-24 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 text-emerald-400 px-4 py-1 rounded-full text-sm mb-6">
            🌍 Powered by Google Earth Engine + AI
          </div>

          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
            Protecting the<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Sundarbans
            </span>
          </h1>

          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto mb-10">
            Real-time mangrove risk intelligence using Sentinel-1 & Sentinel-2 satellite data
          </p>

          <Link
            href="/analysis"
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-lg font-semibold px-10 py-4 rounded-2xl transition-all hover:scale-105"
          >
            Launch Risk Analysis Tool →
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4">How Our System Works</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A simple yet powerful workflow to assess mangrove health and flood risk
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-10 md:p-16">
          <div className="max-w-3xl mx-auto text-zinc-300 leading-relaxed text-lg">
            We developed a system where a user selects a geographic area and time range. 
            The system then retrieves satellite data from <span className="text-emerald-400 font-medium">Google Earth Engine</span>, 
            specifically <strong>Sentinel-1</strong> and <strong>Sentinel-2</strong> imagery. 
            From this, we compute environmental indicators such as <strong>NDVI</strong> (vegetation health), 
            <strong>NDWI</strong> (water content), and radar backscatter (VV polarization). 
            These features are fed into a trained <strong>Random Forest</strong> machine learning model 
            to predict the risk level of the selected area.
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
            <Satellite className="w-12 h-12 text-emerald-400 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Satellite Powered</h3>
            <p className="text-zinc-400">Live data from Sentinel-1 radar and Sentinel-2 optical imagery processed via Google Earth Engine.</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
            <Shield className="w-12 h-12 text-emerald-400 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">AI Risk Prediction</h3>
            <p className="text-zinc-400">Advanced Random Forest model predicts flood and degradation risk with high accuracy.</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl">
            <TrendingUp className="w-12 h-12 text-emerald-400 mb-6" />
            <h3 className="text-2xl font-semibold mb-3">Actionable Insights</h3>
            <p className="text-zinc-400">Interactive heatmap, statistics, hotspot identification, and downloadable reports.</p>
          </div>
        </div>
      </div>

      {/* About the Developer */}
      <div className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
            <User className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-semibold mb-4">About the Developer</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            This project was developed by <span className="text-emerald-400 font-medium">SAM</span>, 
            a passionate developer and researcher focused on applying AI and remote sensing technologies 
            for environmental conservation — particularly in vulnerable ecosystems like the Sundarbans.
          </p>

          <div className="flex justify-center gap-8 mt-10 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Savar, Dhaka, Bangladesh
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> April 2026
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-12 border-t border-zinc-800">
        <p className="text-zinc-500">Built for coastal resilience • Sundarbans, Bangladesh</p>
      </div>
    </div>
  );
}