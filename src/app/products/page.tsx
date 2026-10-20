"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Electronics & Gadgets',
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern consumer electronics, smartphones, laptops, headphones on sleek dark surface, professional product photography&image_size=landscape_4_3',
    desc: 'Cutting-edge consumer electronics including smartphones, audio equipment, smart home devices, and accessories from leading manufacturers.',
    items: ['Smartphones & Tablets', 'Audio Equipment', 'Smart Home Devices', 'Computer Accessories', 'Wearable Tech'],
  },
  {
    name: 'Industrial Equipment',
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial machinery, factory equipment, heavy tools, professional warehouse setting, dark moody lighting&image_size=landscape_4_3',
    desc: 'Heavy-duty industrial machinery, precision tools, automation equipment, and factory supplies for manufacturing operations.',
    items: ['CNC Machines', 'Packaging Equipment', 'Industrial Tools', 'Automation Systems', 'Safety Equipment'],
  },
  {
    name: 'Consumer Goods',
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium retail consumer goods, home decor, kitchenware, elegant display, luxury dark background&image_size=landscape_4_3',
    desc: 'A wide range of quality consumer products including home goods, kitchenware, personal care, and lifestyle products.',
    items: ['Home & Kitchen', 'Personal Care', 'Luggage & Travel', 'Sports & Outdoors', 'Pet Supplies'],
  },
  {
    name: 'Raw Materials',
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial raw materials, steel bars, aluminum, chemicals warehouse, professional photography&image_size=landscape_4_3',
    desc: 'Premium raw materials including metals, plastics, chemicals, and agricultural products sourced responsibly from around the world.',
    items: ['Metals & Alloys', 'Plastics & Polymers', 'Chemical Products', 'Agricultural Commodities', 'Textile Raw Materials'],
  },
  {
    name: 'Textiles & Apparel',
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion textiles, fabric rolls, clothing manufacturing, elegant showroom with dark luxury background&image_size=landscape_4_3',
    desc: 'High-quality textiles, fabrics, and apparel products including ready-made garments and custom manufacturing services.',
    items: ['Fabrics & Textiles', 'Ready-Made Garments', 'Sportswear', 'Home Textiles', 'Industrial Textiles'],
  },
  {
    name: 'Automotive Parts',
    img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=automotive spare parts, engine components, car accessories, professional auto workshop setting&image_size=landscape_4_3',
    desc: 'Genuine and aftermarket automotive components, spare parts, and accessories for all major vehicle brands.',
    items: ['Engine Parts', 'Body Parts', 'Electrical Components', 'Accessories', 'Commercial Vehicle Parts'],
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#ffffff] text-xs font-semibold tracking-[4px] uppercase">Our Products</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#ffffff] mt-6 mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Premium Products<br />
            <span className="text-gray-500">From Around the World</span>
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl mx-auto">
            Explore our comprehensive product portfolio across multiple industries, all backed by our quality guarantee.
          </p>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-8 bg-[#0a0a0a] border-y border-[#ffffff]/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`whitespace-nowrap px-5 py-2.5 text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === i
                    ? 'bg-[#ffffff] text-[#0a0a0a]'
                    : 'text-[#888888] hover:text-[#ffffff] border border-[#ffffff]/20 hover:border-[#ffffff]/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Category Detail */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="card overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={categories[activeCategory].img}
                alt={categories[activeCategory].name}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {categories[activeCategory].name}
              </h2>
              <p className="text-[#888888] leading-relaxed mb-8">
                {categories[activeCategory].desc}
              </p>
              <h3 className="text-[#ffffff] text-base font-semibold tracking-[3px] uppercase mb-4">Product Range</h3>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {categories[activeCategory].items.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[#ffffff]/80">
                    <span className="w-1.5 h-1.5 bg-[#ffffff] rounded-full" />
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
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#ffffff] text-xs font-semibold tracking-[4px] uppercase">Full Catalog</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#ffffff] mt-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-[#ffffff] mb-2">{cat.name}</h3>
                  <p className="text-[#888888] text-base mb-3">{cat.desc}</p>
                  <span className="text-[#ffffff] text-xs tracking-wider uppercase inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
