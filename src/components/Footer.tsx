import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A0E12] border-t border-[rgba(201,178,124,0.1)] w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[rgba(201,178,124,0.3)] flex items-center justify-center">
                <span className="text-[#E8EDF5] font-bold text-sm font-mono">A</span>
              </div>
              <div>
                <div className="text-[#E8EDF5] font-medium tracking-wider text-sm">APEX</div>
                <div className="text-[#8B95A7] text-[10px] tracking-[3px] uppercase font-mono">Global Trade</div>
              </div>
            </div>
            <p className="text-[#8B95A7] text-sm leading-relaxed mb-6 font-light">
              International trading company connecting manufacturers with global markets since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-sm tracking-[3px] uppercase text-[#8B95A7] mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Products', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link === 'Home' ? '' : link.toLowerCase().replace(' ', '')}`}
                    className="text-[#8B95A7] hover:text-[#C9B27C] text-sm transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-mono text-sm tracking-[3px] uppercase text-[#8B95A7] mb-6">Products</h4>
            <ul className="space-y-3">
              {['Electronics', 'Industrial Equipment', 'Consumer Goods', 'Raw Materials'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm hover:text-white transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-sm tracking-[3px] uppercase text-[#8B95A7] mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="text-gray-400">
                <span className="text-[#8B95A7]">Address:</span><br />
                Suite 2500, Trade Center<br />
                Shanghai, China 200000
              </li>
              <li className="text-gray-400">
                <span className="text-[#8B95A7]">Email:</span><br />
                info@apexglobaltrade.com
              </li>
              <li className="text-gray-400">
                <span className="text-[#8B95A7]">Phone:</span><br />
                +86 21 8888 8888
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[rgba(201,178,124,0.1)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8B95A7] text-sm font-mono">
            © 2026 Apex Global Trade
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[#8B95A7] hover:text-white text-sm transition-colors duration-300 font-mono">Privacy</Link>
            <Link href="#" className="text-[#8B95A7] hover:text-white text-sm transition-colors duration-300 font-mono">Terms</Link>
            <Link href="/admin" className="text-[#8B95A7] hover:text-white text-sm transition-colors duration-300 font-mono">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
