import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-amber-400">
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

          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("manufacturing")}
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Manufacturing
                </button>
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

          <div>
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

          <div>
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

        <div className="border-t border-gray-700 pt-8">
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
