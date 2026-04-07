// components/Navbar.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Leaf, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Risk Analysis', path: '/analysis' },
    { name: 'About', path: '/about' },
    { name: 'Documentation', path: '/documentation' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <Leaf className="w-6 h-6 text-white" />
          <div className="leading-tight">
            <h1 className="text-xl font-semibold tracking-tight text-white group-hover:text-emerald-400 transition">
              SundarbanAI
            </h1>
            <p className="text-[10px] tracking-widest text-emerald-400/70">
              MANGROVE RISK INTELLIGENCE
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wide">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className="relative text-white/70 hover:text-white transition duration-300"
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-emerald-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 hover:w-full'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-emerald-400 blur-sm opacity-70"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/95 border-b border-white/10 ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg tracking-wide transition-colors ${
                pathname === item.path ? 'text-emerald-400' : 'text-white/70'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}