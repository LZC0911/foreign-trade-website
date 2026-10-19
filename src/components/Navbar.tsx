"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0f1a]/95 backdrop-blur-md shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border border-[#c9a64a] flex items-center justify-center">
              <span className="text-[#c9a64a] font-bold text-lg tracking-tight">A</span>
            </div>
            <div>
              <div className="text-[#e8edf5] font-semibold tracking-wider text-lg">APEX</div>
              <div className="text-[#c9a64a] text-[10px] tracking-[3px] uppercase">Global Trade</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#e8edf5]/80 hover:text-[#c9a64a] text-sm font-medium tracking-wider uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a64a] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="border border-[#c9a64a] text-[#c9a64a] px-6 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#c9a64a] hover:text-[#0a0f1a] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#c9a64a] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-white/10 animate-fadeInUp">
            <div className="flex flex-col gap-4 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#e8edf5]/80 hover:text-[#c9a64a] text-sm font-medium tracking-wider uppercase transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="border border-[#c9a64a] text-[#c9a64a] px-6 py-3 text-xs font-semibold tracking-widest uppercase text-center mt-2 hover:bg-[#c9a64a] hover:text-[#0a0f1a] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
