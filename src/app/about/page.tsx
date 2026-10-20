import { Target, Eye, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffffff]/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#ffffff] text-xs font-semibold tracking-[4px] uppercase">About Us</span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#ffffff] mt-6 mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            A Legacy of<br />
            <span className="text-gray-500">Global Excellence</span>
          </h1>
          <p className="text-[#888888] text-lg max-w-3xl mx-auto leading-relaxed">
            For over 15 years, Apex Global Trade has been at the forefront of international commerce, 
            bridging manufacturers and markets with unwavering integrity and unparalleled expertise.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#ffffff] text-xs font-semibold tracking-[4px] uppercase">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#ffffff] mt-4 mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                From Humble Beginnings<br />to Global Leadership
              </h2>
              <div className="space-y-5 text-[#888888] leading-relaxed">
                <p>
                  Founded in 2008 in Shanghai, Apex Global Trade began with a simple vision — to make international trade 
                  accessible, transparent, and reliable for businesses of all sizes.
                </p>
                <p>
                  What started as a small trading operation has grown into a comprehensive global enterprise with offices 
                  across three continents and a supplier network spanning over 30 countries. Our success is built on 
                  the enduring relationships we've forged and the trust of our clients worldwide.
                </p>
                <p>
                  Today, we continue to innovate and expand, leveraging cutting-edge logistics technology and market 
                  intelligence to deliver exceptional value to every partner we serve.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { year: '2008', event: 'Company founded in Shanghai' },
                { year: '2012', event: 'Expanded to Southeast Asia' },
                { year: '2016', event: 'Opened European headquarters' },
                { year: '2020', event: 'Launched digital platform' },
                { year: '2023', event: 'Reached 80+ countries' },
                { year: '2026', event: 'Industry leader in trust' },
              ].map((milestone, i) => (
                <div key={i} className="card p-6">
                  <div className="text-2xl font-bold text-white mb-2">{milestone.year}</div>
                  <div className="text-[#888888] text-sm">{milestone.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To empower businesses worldwide through reliable, efficient, and ethical global trade solutions that create lasting value.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'To be the most trusted international trading partner, known for excellence, innovation, and sustainable growth.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                desc: 'Integrity, excellence, partnership, and sustainability guide every decision we make and every relationship we build.',
              },
            ].map((item, i) => (
              <div key={i} className="card p-10 text-center">
                <div className="w-16 h-16 mx-auto bg-[#ffffff]/10 border border-[#ffffff]/30 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="text-[#ffffff]" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#ffffff] mb-4">{item.title}</h3>
                <p className="text-[#888888] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#ffffff] text-xs font-semibold tracking-[4px] uppercase">Certifications</span>
          <h2 className="text-4xl font-bold text-[#ffffff] mt-4 mb-16" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Industry Recognized & Certified
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['ISO 9001', 'ISO 14001', 'SEDEX', 'BSCI', 'WRAP', 'OEKO-TEX', 'FSC', 'RoHS'].map((cert) => (
              <div key={cert} className="card p-6 flex flex-col items-center justify-center">
                <CheckCircle2 className="text-[#ffffff] mb-3" size={24} />
                <span className="text-[#ffffff] font-semibold text-sm tracking-wider">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
