import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
            <h3 className="mb-4 text-2xl font-bold text-amber-400">
              WoodFloat Pro
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Leading manufacturer and trader of Small wood work for
              professional masons and plasterers worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-amber-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-amber-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-amber-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-700 p-2 rounded-lg hover:bg-amber-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/manufacturing"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Manufacturing
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              Services
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>Custom Manufacturing</li>
              <li>Bulk Orders</li>
              <li>International Trading</li>
              <li>Quality Assurance</li>
              <li>Fast Delivery</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              Contact Info
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Industrial Park Drive</li>
              <li>Manufacturing District</li>
              <li>City, State 12345</li>
              <li className="pt-2">
                <a
                  href="tel:+15551234567"
                  className="hover:text-amber-400 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@woodfloatpro.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  info@woodfloatpro.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {currentYear} WoodFloat Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
