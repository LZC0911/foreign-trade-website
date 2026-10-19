import Link from 'next/link';
import { ArrowRight, Globe, Shield, TrendingUp, Award, Users, Package } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a64a]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4a9eff]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 text-center">
          {/* Pre-title */}
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block text-[#c9a64a] text-xs font-semibold tracking-[4px] uppercase border border-[#c9a64a]/30 px-6 py-3 mb-8">
              Since 2008 — Trusted Worldwide
            </span>
          </div>

          {/* Main title */}
          <h1 className="fade-in-up text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', serif", animationDelay: '0.3s' }}>
            <span className="text-[#e8edf5]">Connecting</span><br />
            <span className="shimmer">Global Markets</span><br />
            <span className="text-[#e8edf5]">with Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up text-lg md:text-xl text-[#8b95a7] max-w-3xl mx-auto mb-12 leading-relaxed" style={{ animationDelay: '0.5s' }}>
            Apex Global Trade is a premier international trading firm, delivering superior products and seamless supply chain solutions to clients across 80+ countries.
          </p>

          {/* CTA Buttons */}
          <div className="fade-in-up flex flex-col sm:flex-row gap-5 justify-center" style={{ animationDelay: '0.7s' }}>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="btn-outline inline-flex items-center justify-center gap-2"
            >
              Request a Quote
            </Link>
          </div>

          {/* Stats strip */}
          <div className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-[#c9a64a]/10" style={{ animationDelay: '0.9s' }}>
            {[
              { value: '80+', label: 'Countries Served' },
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Global Clients' },
              { value: '98%', label: 'On-Time Delivery' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2">{stat.value}</div>
                <div className="text-[#8b95a7] text-xs tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#c9a64a]/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#c9a64a] rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0d1320]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#c9a64a] text-xs font-semibold tracking-[4px] uppercase">Why Choose Us</span>
            <div className="section-divider" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#e8edf5] mt-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Built on Trust.<br />
              Driven by Excellence.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Global Network', desc: 'Extensive supplier network spanning Asia, Europe, and the Americas for the best sourcing options.' },
              { icon: Shield, title: 'Quality Guaranteed', desc: 'Rigorous quality control with ISO-certified inspection at every stage of the supply chain.' },
              { icon: TrendingUp, title: 'Competitive Pricing', desc: 'Direct factory partnerships enable us to offer premium products at market-leading prices.' },
              { icon: Award, title: 'Premium Service', desc: 'Dedicated account managers provide personalized support from inquiry to delivery.' },
              { icon: Package, title: 'Logistics Mastery', desc: 'End-to-end shipping solutions with real-time tracking and customs clearance expertise.' },
              { icon: Users, title: 'Trusted Partnership', desc: 'Long-term relationships built on transparency, reliability, and mutual success.' },
            ].map((feature, i) => (
              <div key={i} className="card p-8 group">
                <div className="w-14 h-14 bg-[#c9a64a]/10 border border-[#c9a64a]/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#c9a64a] transition-all duration-500">
                  <feature.icon className="text-[#c9a64a] group-hover:text-[#0a0f1a] transition-colors duration-500" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#e8edf5] mb-3">{feature.title}</h3>
                <p className="text-[#8b95a7] leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-[#0a0f1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#c9a64a] text-xs font-semibold tracking-[4px] uppercase">Our Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#e8edf5] mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Premium Product Categories
              </h2>
            </div>
            <Link href="/products" className="text-[#c9a64a] hover:text-[#c9a64a] text-sm font-medium tracking-wider uppercase inline-flex items-center gap-2 group">
              View All Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Electronics & Gadgets', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sleek modern electronics products on dark background, professional product photography, gold accent lighting&image_size=square' },
              { name: 'Industrial Equipment', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial machinery and equipment, factory setting, professional photography, dark navy background with gold highlights&image_size=square' },
              { name: 'Consumer Goods', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium consumer products and retail goods, elegant display, dark luxury background with gold accents&image_size=square' },
              { name: 'Raw Materials', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial raw materials warehouse, steel, minerals, professional photography, dark moody lighting&image_size=square' },
            ].map((product, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg card">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-[#e8edf5] mb-1">{product.name}</h3>
                  <span className="text-[#c9a64a] text-xs tracking-wider uppercase inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] via-[#1b2838] to-[#0d1b2a]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#c9a64a] text-xs font-semibold tracking-[4px] uppercase">Let's Work Together</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#e8edf5] mt-6 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Elevate<br />
            <span className="shimmer">Your Business?</span>
          </h2>
          <p className="text-[#8b95a7] text-lg max-w-2xl mx-auto mb-10">
            Send us your requirements and our team will provide a comprehensive solution within 24 hours.
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
