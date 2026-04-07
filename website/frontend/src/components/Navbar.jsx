// components/Navbar.jsx
'use client';
import Link from 'next/link';
import { Leaf, BarChart3 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">SundarbanAI</h1>
            <p className="text-[10px] text-emerald-400 -mt-1">MANGROVE RISK INTELLIGENCE</p>
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <Link href="/analysis" className="hover:text-emerald-400 transition-colors font-medium">Risk Analysis</Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">About</Link>
          <Link href="#" className="hover:text-emerald-400 transition-colors">Documentation</Link>
          
          <Link 
            href="/analysis"
            className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all"
          >
            <BarChart3 size={18} />
            Start Analysis
          </Link>
        </div>
      </div>
    </nav>
  );
}