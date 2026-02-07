import { CheckCircle } from 'lucide-react';

const products = [
  {
    name: 'Professional Plasterer Float',
    size: '6" X 4"',
    description: 'Premium quality wooden float with smooth surface for professional plasterers. Made from seasoned hardwood.',
    features: ['Ergonomic handle', 'Lightweight design', 'Durable construction', 'Smooth finish'],
  },
  {
    name: 'Master Mason Float',
    size: '8" X 4"',
    description: 'Heavy-duty float designed for masonry work. Perfect for concrete finishing and leveling.',
    features: ['Extra grip handle', 'Weather resistant', 'Professional grade', 'Long-lasting'],
  },
  {
    name: 'Compact Hand Float',
    size: '9" X 4"',
    description: 'Ideal for detailed work and tight spaces. Lightweight yet sturdy construction.',
    features: ['Comfortable grip', 'Precision control', 'Portable size', 'Multi-purpose use'],
  },
  {
    name: 'Premium Large Float',
    size: '10" X 4"',
    description: 'Extra-large float for covering more surface area. Professional choice for large projects.',
    features: ['Extended reach', 'Balanced weight', 'Superior finish', 'Heavy-duty build'],
  },
];

export default function Products() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Product Range
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            High-quality wooden hand floats crafted with precision for professional masonry and plastering work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300"
            >
              <div className="bg-amber-700 rounded-lg h-48 mb-6 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl font-bold mb-2">{product.size}</div>
                  <div className="text-sm opacity-90">Size</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {product.name}
              </h3>

              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 transition-colors">
                Request Quote
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-800 to-orange-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Custom Orders Available
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Need specific sizes or bulk quantities? We offer custom manufacturing solutions for your unique requirements.
          </p>
          <button className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
            Contact Us for Custom Orders
          </button>
        </div>
      </div>
    </section>
  );
}
