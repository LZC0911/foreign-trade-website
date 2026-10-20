import Link from 'next/link';
import { ArrowRight, Globe, Shield, TrendingUp, Award, Users, Package } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center grid-bg">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Pre-title */}
          <div className="fade-in-up mb-10" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block font-mono text-[10px] tracking-[3px] uppercase text-gray-500 border border-white/10 px-4 py-2">
              EST. 2008 / GLOBAL NETWORK
            </span>
          </div>

          {/* Main title */}
          <h1 className="fade-in-up text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace", animationDelay: '0.2s' }}>
            <span className="text-white">CONNECTING</span><br />
            <span className="text-gray-500">GLOBAL MARKETS</span><br />
            <span className="text-white">WITH PRECISION</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light" style={{ animationDelay: '0.4s' }}>
            Premier international trading firm delivering superior products and seamless supply chain solutions across 80+ countries.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Explore Products
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Request a Quote
            </Link>
          </div>

          {/* Stats strip */}
          <div className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-12 mt-28 pt-16 border-t border-white/10 w-full" style={{ animationDelay: '0.8s' }}>
            {[
              { value: '80+', label: 'Countries' },
              { value: '15+', label: 'Years' },
              { value: '500+', label: 'Clients' },
              { value: '98%', label: 'On-Time' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono">{stat.value}</div>
                <div className="text-gray-500 text-[10px] tracking-[2px] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="font-mono text-[10px] tracking-[3px] uppercase text-gray-500 mb-4">Capabilities</span>
            <div className="section-divider" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              BUILT ON TRUST.<br />DRIVEN BY EXCELLENCE.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'Global Network', desc: 'Extensive supplier network spanning Asia, Europe, and the Americas.' },
              { icon: Shield, title: 'Quality Guaranteed', desc: 'ISO-certified inspection at every stage of the supply chain.' },
              { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Direct factory partnerships for market-leading prices.' },
              { icon: Award, title: 'Premium Service', desc: 'Dedicated account managers from inquiry to delivery.' },
              { icon: Package, title: 'Logistics Mastery', desc: 'End-to-end shipping with real-time tracking.' },
              { icon: Users, title: 'Trusted Partnership', desc: 'Long-term relationships built on transparency.' },
            ].map((feature, i) => (
              <div key={i} className="card p-8 flex flex-col">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-6">
                  <feature.icon className="text-gray-400" size={18} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="w-full py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-[10px] tracking-[3px] uppercase text-gray-500">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                PRODUCT CATEGORIES
              </h2>
            </div>
            <Link href="/products" className="text-gray-400 hover:text-white text-xs font-medium tracking-[2px] uppercase inline-flex items-center gap-2 transition-colors duration-300 font-mono">
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Electronics', code: '01', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=minimal electronics on pure black background, monochrome, high contrast, product photography&image_size=square' },
              { name: 'Industrial Equipment', code: '02', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial machinery on black background, monochrome, dramatic lighting&image_size=square' },
              { name: 'Consumer Goods', code: '03', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=consumer products on black background, monochrome, minimal composition&image_size=square' },
              { name: 'Raw Materials', code: '04', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=raw materials warehouse on black background, monochrome, industrial aesthetic&image_size=square' },
            ].map((product) => (
              <div key={product.code} className="group relative overflow-hidden card">
                <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-mono text-[10px] text-gray-500 tracking-wider">{product.code}</span>
                  <h3 className="text-base font-medium text-white mt-1">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] tracking-[3px] uppercase text-gray-500">Initiate Contact</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-8 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            READY TO<br />COLLABORATE?
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-10 font-light">
            Send requirements. Receive comprehensive solution within 24 hours.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
