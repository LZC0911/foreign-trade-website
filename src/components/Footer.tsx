import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#010409] border-t border-[#3ec5a0]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[#3ec5a0] flex items-center justify-center">
                <span className="text-[#3ec5a0] font-bold text-lg tracking-tight">A</span>
              </div>
              <div>
                <div className="text-[#c9d1d9] font-semibold tracking-wider text-lg">APEX</div>
                <div className="text-[#3ec5a0] text-[10px] tracking-[3px] uppercase">Global Trade</div>
              </div>
            </div>
            <p className="text-[#8b949e] text-sm leading-relaxed mb-6">
              Premium international trading company connecting quality manufacturers with global markets since 2008.
            </p>
            <div className="flex gap-4">
              {['in', 'X', 'f', '◯'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 border border-[#3ec5a0]/30 flex items-center justify-center text-[#3ec5a0] hover:bg-[#3ec5a0] hover:text-[#0d1117] transition-all duration-300 text-xs"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#3ec5a0] text-xs font-semibold tracking-[3px] uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Products', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link === 'Home' ? '' : link.toLowerCase().replace(' ', '')}`}
                    className="text-[#8b949e] hover:text-[#3ec5a0] text-sm transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[#3ec5a0] text-xs font-semibold tracking-[3px] uppercase mb-6">Products</h4>
            <ul className="space-y-3">
              {['Electronics', 'Industrial Equipment', 'Consumer Goods', 'Raw Materials', 'Textiles'].map((item) => (
                <li key={item}>
                  <span className="text-[#8b949e] text-sm cursor-pointer hover:text-[#3ec5a0] transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#3ec5a0] text-xs font-semibold tracking-[3px] uppercase mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="text-[#8b949e] text-sm">
                <span className="text-[#3ec5a0]">Address:</span><br />
                Suite 2500, Trade Center<br />
                Shanghai, China 200000
              </li>
              <li className="text-[#8b949e] text-sm">
                <span className="text-[#3ec5a0]">Email:</span><br />
                info@apexglobaltrade.com
              </li>
              <li className="text-[#8b949e] text-sm">
                <span className="text-[#3ec5a0]">Phone:</span><br />
                +86 21 8888 8888
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#3ec5a0]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8b949e] text-xs tracking-wider">
            © 2026 Apex Global Trade. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-[#8b949e] hover:text-[#3ec5a0] text-xs transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="text-[#8b949e] hover:text-[#3ec5a0] text-xs transition-colors duration-300">Terms of Service</Link>
            <Link href="/admin" className="text-[#8b949e] hover:text-[#3ec5a0] text-xs transition-colors duration-300">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
