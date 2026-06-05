import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-white/40 bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            <Link to="/contact-us-form-responses" className="text-gray-700 hover:text-amber-800 transition-colors">
              Forms
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-amber-800 transition-colors"
            >
              Contact
            </button>
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Hi {user?.first_name || 'User'}</span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="text-gray-700 hover:text-amber-800 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-amber-800 transition-colors">
                Login
              </Link>
            )}
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
        <div className="border-t border-white/40 bg-white/90 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
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
            {isAuthenticated ? (
              <>
                <span className="block w-full text-left px-3 py-2 text-gray-700 rounded-md">Hi {user?.first_name || 'User'}</span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-800 rounded-md transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
