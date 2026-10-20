import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-white/30 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-mono">A</span>
              </div>
              <div>
                <div className="text-white font-medium tracking-wider text-sm">APEX</div>
                <div className="text-gray-500 text-[10px] tracking-[3px] uppercase font-mono">Global Trade</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light">
              International trading company connecting manufacturers with global markets since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-sm tracking-[3px] uppercase text-gray-500 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Products', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link === 'Home' ? '' : link.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-mono text-sm tracking-[3px] uppercase text-gray-500 mb-6">Products</h4>
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
            <h4 className="font-mono text-sm tracking-[3px] uppercase text-gray-500 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="text-gray-400">
                <span className="text-gray-500">Address:</span><br />
                Suite 2500, Trade Center<br />
                Shanghai, China 200000
              </li>
              <li className="text-gray-400">
                <span className="text-gray-500">Email:</span><br />
                info@apexglobaltrade.com
              </li>
              <li className="text-gray-400">
                <span className="text-gray-500">Phone:</span><br />
                +86 21 8888 8888
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-mono">
            © 2026 Apex Global Trade
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300 font-mono">Privacy</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors duration-300 font-mono">Terms</Link>
            <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors duration-300 font-mono">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
