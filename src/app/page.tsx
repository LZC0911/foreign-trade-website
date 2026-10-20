import Link from 'next/link';
import { ArrowRight, Globe, Shield, TrendingUp, Award, Users, Package } from 'lucide-react';

// 稳定的产品图（unsplash 固定 photo ID，无地区限制）
const productImages = [
  { name: 'Electronics', code: '01', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80&auto=format&fit=crop' },
  { name: 'Industrial Equipment', code: '02', img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80&auto=format&fit=crop' },
  { name: 'Consumer Goods', code: '03', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop' },
  { name: 'Raw Materials', code: '04', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80&auto=format&fit=crop' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center dot-map-bg">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Pre-title */}
          <div className="fade-in-up mb-10" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block font-mono text-xs tracking-[3px] uppercase text-[#8B95A7] border border-[rgba(201,178,124,0.3)] px-5 py-2.5">
              EST. 2008 / GLOBAL NETWORK
            </span>
          </div>

          {/* Main title */}
          <h1 className="fade-in-up text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-10 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace", animationDelay: '0.2s' }}>
            <span className="text-[#E8EDF5]">CONNECTING</span><br />
            <span className="text-[#C9B27C]">GLOBAL MARKETS</span><br />
            <span className="text-[#E8EDF5]">WITH PRECISION</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up text-lg md:text-xl text-[#8B95A7] max-w-2xl mx-auto mb-14 leading-relaxed font-light" style={{ animationDelay: '0.4s' }}>
            Premier international trading firm delivering superior products and seamless supply chain solutions across 80+ countries.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up flex flex-col sm:flex-row gap-5" style={{ animationDelay: '0.6s' }}>
            <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
              Explore Products <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-outline inline-flex items-center justify-center gap-2">
              Request a Quote
            </Link>
          </div>

          {/* Stats strip */}
          <div className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-12 mt-28 pt-16 border-t border-[rgba(201,178,124,0.15)] w-full" style={{ animationDelay: '0.8s' }}>
            {[
              { value: '80+', label: 'Countries' },
              { value: '15+', label: 'Years' },
              { value: '500+', label: 'Clients' },
              { value: '98%', label: 'On-Time' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-[#C9B27C] mb-3 font-mono">{stat.value}</div>
                <div className="text-[#5F6B7D] text-xs tracking-[2px] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center">
          <div className="w-px h-16 bg-gradient-to-b from-[rgba(201,178,124,0.3)] to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-32 bg-[#0F1419] flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-20 w-full">
            <span className="font-mono text-xs tracking-[3px] uppercase text-[#8B95A7] mb-4">Capabilities</span>
            <div className="section-divider" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#E8EDF5] mt-6 tracking-tight leading-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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
                <div className="w-11 h-11 border border-[rgba(201,178,124,0.3)] flex items-center justify-center mb-6">
                  <feature.icon className="text-[#C9B27C]" size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-[#E8EDF5] mb-3">{feature.title}</h3>
                <p className="text-[#8B95A7] leading-relaxed text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="w-full py-32 bg-[#0F1419] border-t border-[rgba(201,178,124,0.08)] flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col items-center">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs tracking-[3px] uppercase text-[#8B95A7]">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#E8EDF5] mt-4 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                PRODUCT CATEGORIES
              </h2>
            </div>
            <Link href="/products" className="text-[#8B95A7] hover:text-[#C9B27C] text-sm font-medium tracking-[2px] uppercase inline-flex items-center gap-2 transition-colors duration-300 font-mono">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productImages.map((product) => (
              <div key={product.code} className="group relative overflow-hidden card">
                <div className="aspect-[4/5] overflow-hidden bg-[#161C24]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-mono text-xs text-[#C9B27C] tracking-wider">{product.code}</span>
                  <h3 className="text-lg font-medium text-[#E8EDF5] mt-1.5">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 bg-[#0F1419] border-t border-[rgba(201,178,124,0.08)] flex flex-col items-center">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="font-mono text-xs tracking-[3px] uppercase text-[#8B95A7]">Initiate Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8EDF5] mt-6 mb-8 tracking-tight leading-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            READY TO<br />COLLABORATE?
          </h2>
          <p className="text-[#8B95A7] text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Send requirements. Receive comprehensive solution within 24 hours.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
