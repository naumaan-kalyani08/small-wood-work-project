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
    <section id="products" className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/30 to-white py-20">
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-800">OUR PRODUCT RANGE</span>
          <h2 className="mb-4 text-3xl font-black text-gray-900 md:text-4xl">
            Precision-built tools for every job
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            High-quality wooden hand floats crafted with precision for professional masonry and plastering work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <article
              key={index}
              className="rounded-[1.75rem] border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-48 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-amber-700 to-orange-700 shadow-inner">
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

              <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-700 to-orange-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                Request Quote
              </button>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/40 bg-white/70 p-8 text-center shadow-2xl backdrop-blur-xl md:p-12">
          <h3 className="mb-4 text-2xl font-black text-gray-900 md:text-3xl">
            Custom Orders Available
          </h3>
          <p className="mb-6 text-lg text-gray-600">
            Need specific sizes or bulk quantities? We offer custom manufacturing solutions for your unique requirements.
          </p>
          <button className="rounded-2xl bg-gradient-to-r from-amber-700 to-orange-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
            Contact Us for Custom Orders
          </button>
        </div>
      </div>
    </section>
  );
}
