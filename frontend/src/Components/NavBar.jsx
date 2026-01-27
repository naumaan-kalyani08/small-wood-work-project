import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-amber-800">
              Small wood work
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-amber-800 transition-colors">
              Home
            </Link>
            {/* <button
              onClick={() => scrollToSection("products")}
              className="text-gray-700 hover:text-amber-800 transition-colors"
            >
              Products
            </button> */}
            <Link to="/products" className="text-gray-700 hover:text-amber-800 transition-colors">
              Products
            </Link>
            <Link to="/manufacturing" className="text-gray-700 hover:text-amber-800 transition-colors">
              Manufacturing
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-amber-800 transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/"
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link to="/products"
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
            >
              Products
            </Link>
            <Link to="/manufacturing"
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
            >
              Manufacturing
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
