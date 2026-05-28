import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/40 to-white pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Small wood work
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
              Crafting excellence in masonry tools since decades. We manufacture
              and trade high-quality wooden hand floats for professional
              plasterers and masons worldwide.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollToSection("products")}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-700 to-orange-500 px-8 py-3 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                View Products
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center rounded-2xl border border-amber-700 bg-white/70 px-8 py-3 text-amber-800 shadow-md transition-all duration-300 hover:bg-amber-700 hover:text-white"
              >
                Get Quote
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-xl p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-square bg-gradient-to-br from-amber-700 to-orange-800 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">25+</div>
                    <div className="text-xl">Years Experience</div>
                    <p className="mt-3 text-sm text-amber-100">Trusted by professionals across the globe.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
