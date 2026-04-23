import { Outlet, Link, useLocation } from "react-router";
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/about", label: "About Us" },
    { path: "/success-stories", label: "Success Stories" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="bg-[#0a0f2c] text-white sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-[#f0a500]" />
              <span className="text-xl font-bold">FundRecovery Pro</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hover:text-[#f0a500] transition-colors ${
                    location.pathname === link.path ? "text-[#f0a500]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              to="/consultation"
              className="bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Free Consultation
            </Link>
          </div>

          <div className="md:hidden flex flex-wrap gap-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm hover:text-[#f0a500] transition-colors ${
                  location.pathname === link.path ? "text-[#f0a500]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-[#0a0f2c] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-[#f0a500]" />
                <span className="text-xl font-bold">FundRecovery Pro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Leading experts in fund recovery from online scams and cyber fraud. We help victims recover their money with a proven track record.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#f0a500]">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-[#f0a500] text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#f0a500]">Contact Us</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@fundrecoverypro.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Recovery Street, NY 10001</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-[#f0a500]">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#f0a500] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#f0a500] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#f0a500] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#f0a500] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-xs mb-4">
              <strong>Disclaimer:</strong> FundRecovery Pro provides consultation and assistance in fund recovery cases. Results may vary depending on individual circumstances. We do not guarantee recovery in all cases. All information provided is confidential and secure.
            </p>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>&copy; 2026 FundRecovery Pro. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-[#f0a500] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#f0a500] transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
