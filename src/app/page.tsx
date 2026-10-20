import Link from 'next/link';
import { ArrowRight, Globe, Shield, TrendingUp, Award, Users, Package } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3ec5a0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#58a6ff]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 text-center">
          {/* Pre-title */}
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block text-[#3ec5a0] text-xs font-semibold tracking-[4px] uppercase border border-[#3ec5a0]/30 px-6 py-3 mb-8">
              Since 2008 — Trusted Worldwide
            </span>
          </div>

          {/* Main title */}
          <h1 className="fade-in-up text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", animationDelay: '0.3s' }}>
            <span className="text-[#c9d1d9]">Connecting</span><br />
            <span className="text-[#3ec5a0]">Global Markets</span><br />
            <span className="text-[#c9d1d9]">with Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="fade-in-up text-lg md:text-xl text-[#8b949e] max-w-3xl mx-auto mb-12 leading-relaxed" style={{ animationDelay: '0.5s' }}>
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
          <div className="fade-in-up grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-[#3ec5a0]/10" style={{ animationDelay: '0.9s' }}>
            {[
              { value: '80+', label: 'Countries Served' },
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Global Clients' },
              { value: '98%', label: 'On-Time Delivery' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-[#3ec5a0] mb-2">{stat.value}</div>
                <div className="text-[#8b949e] text-xs tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#3ec5a0]/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-[#3ec5a0] rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#3ec5a0] text-xs font-semibold tracking-[4px] uppercase">Why Choose Us</span>
            <div className="section-divider" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#c9d1d9] mt-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
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
                <div className="w-14 h-14 bg-[#3ec5a0]/10 border border-[#3ec5a0]/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#3ec5a0] transition-all duration-500">
                  <feature.icon className="text-[#3ec5a0] group-hover:text-[#0d1117] transition-colors duration-500" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#c9d1d9] mb-3">{feature.title}</h3>
                <p className="text-[#8b949e] leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#3ec5a0] text-xs font-semibold tracking-[4px] uppercase">Our Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#c9d1d9] mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Premium Product Categories
              </h2>
            </div>
            <Link href="/products" className="text-[#3ec5a0] hover:text-[#5dd4b8] text-sm font-medium tracking-wider uppercase inline-flex items-center gap-2 group transition-colors duration-300">
              View All Products
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Electronics & Gadgets', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sleek modern electronics products on dark background, professional product photography, subtle teal accent lighting&image_size=square' },
              { name: 'Industrial Equipment', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial machinery and equipment, factory setting, professional photography, dark graphite background with subtle teal highlights&image_size=square' },
              { name: 'Consumer Goods', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium consumer products and retail goods, elegant display, dark sophisticated background with subtle teal accents&image_size=square' },
              { name: 'Raw Materials', img: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=industrial raw materials warehouse, steel, minerals, professional photography, dark moody lighting with subtle teal undertones&image_size=square' },
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-semibold text-[#c9d1d9] mb-1">{product.name}</h3>
                  <span className="text-[#3ec5a0] text-xs tracking-wider uppercase inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#0d1117]" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#3ec5a0] text-xs font-semibold tracking-[4px] uppercase">Let's Work Together</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#c9d1d9] mt-6 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to Elevate<br />
            <span className="text-[#3ec5a0]">Your Business?</span>
          </h2>
          <p className="text-[#8b949e] text-lg max-w-2xl mx-auto mb-10">
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
