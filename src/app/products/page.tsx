"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Electronics & Gadgets',
    desc: 'Cutting-edge consumer electronics including smartphones, audio equipment, smart home devices, and accessories from leading manufacturers.',
    items: ['Smartphones & Tablets', 'Audio Equipment', 'Smart Home Devices', 'Computer Accessories', 'Wearable Tech'],
  },
  {
    name: 'Industrial Equipment',
    desc: 'Heavy-duty industrial machinery, precision tools, automation equipment, and factory supplies for manufacturing operations.',
    items: ['CNC Machines', 'Packaging Equipment', 'Industrial Tools', 'Automation Systems', 'Safety Equipment'],
  },
  {
    name: 'Consumer Goods',
    desc: 'A wide range of quality consumer products including home goods, kitchenware, personal care, and lifestyle products.',
    items: ['Home & Kitchen', 'Personal Care', 'Luggage & Travel', 'Sports & Outdoors', 'Pet Supplies'],
  },
  {
    name: 'Raw Materials',
    desc: 'Premium raw materials including metals, plastics, chemicals, and agricultural products sourced responsibly from around the world.',
    items: ['Metals & Alloys', 'Plastics & Polymers', 'Chemical Products', 'Agricultural Commodities', 'Textile Raw Materials'],
  },
  {
    name: 'Textiles & Apparel',
    desc: 'High-quality textiles, fabrics, and apparel products including ready-made garments and custom manufacturing services.',
    items: ['Fabrics & Textiles', 'Ready-Made Garments', 'Sportswear', 'Home Textiles', 'Industrial Textiles'],
  },
  {
    name: 'Automotive Parts',
    desc: 'Genuine and aftermarket automotive components, spare parts, and accessories for all major vehicle brands.',
    items: ['Engine Parts', 'Body Parts', 'Electrical Components', 'Accessories', 'Commercial Vehicle Parts'],
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categoryImages = [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop',
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero */}
      <section className="relative w-full pt-40 pb-20 overflow-hidden bg-[#0F1419]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#E8EDF5] text-xs font-semibold tracking-[4px] uppercase">Our Products</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E8EDF5] mt-6 mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Premium Products<br />
            <span className="text-[#C9B27C]">From Around the World</span>
          </h1>
          <p className="text-[#8B95A7] text-lg max-w-3xl mx-auto">
            Explore our comprehensive product portfolio across multiple industries, all backed by our quality guarantee.
          </p>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-8 bg-[#0F1419] border-y border-[rgba(201,178,124,0.1)] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`whitespace-nowrap px-5 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === i
                    ? 'bg-[#C9B27C] text-[#0F1419]'
                    : 'text-[#8B95A7] hover:text-[#E8EDF5] border border-[rgba(201,178,124,0.15)] hover:border-[rgba(201,178,124,0.5)]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Category Detail */}
      <section className="py-20 bg-[#0F1419]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={categoryImages[activeCategory]}
                alt={categories[activeCategory].name}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#E8EDF5] mb-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {categories[activeCategory].name}
              </h2>
              <p className="text-[#8B95A7] leading-relaxed mb-8">
                {categories[activeCategory].desc}
              </p>
              <h3 className="text-[#E8EDF5] text-base font-semibold tracking-[3px] uppercase mb-4">Product Range</h3>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {categories[activeCategory].items.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[#E8EDF5]/80">
                    <span className="w-1.5 h-1.5 bg-[#C9B27C] rounded-full" />
                    <span className="text-base">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Request Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-24 bg-[#0F1419]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#E8EDF5] text-xs font-semibold tracking-[4px] uppercase">Full Catalog</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#E8EDF5] mt-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Explore All Categories
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg card cursor-pointer"
                onClick={() => {
                  setActiveCategory(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={categoryImages[i]}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-[#E8EDF5] mb-2">{cat.name}</h3>
                  <p className="text-[#8B95A7] text-base mb-3">{cat.desc}</p>
                  <span className="text-[#C9B27C] text-xs tracking-wider uppercase inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
