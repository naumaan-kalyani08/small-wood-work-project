import { Factory, Hammer, Award, Users } from 'lucide-react';

const features = [
  {
    icon: Factory,
    title: 'Modern Facility',
    description: 'State-of-the-art manufacturing unit equipped with advanced woodworking machinery and quality control systems.',
  },
  {
    icon: Hammer,
    title: 'Expert Craftsmanship',
    description: 'Skilled artisans with decades of experience ensuring each float meets the highest quality standards.',
  },
  {
    icon: Award,
    title: 'Quality Materials',
    description: 'Premium seasoned hardwood sourced sustainably, treated and processed for durability and performance.',
  },
  {
    icon: Users,
    title: 'Global Trading',
    description: 'Extensive distribution network serving professional contractors and retailers across international markets.',
  },
];

const stats = [
  { value: '50K+', label: 'Units Produced Annually' },
  { value: '25+', label: 'Years in Business' },
  { value: '200+', label: 'Active Clients' },
  { value: '15+', label: 'Countries Served' },
];

export default function Manufacturing() {
  return (
    <section id="manufacturing" className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Manufacturing Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combining traditional craftsmanship with modern manufacturing techniques to deliver superior quality wooden floats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="bg-amber-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-amber-800" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Numbers Speak
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Quality Assurance Process
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-amber-800 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Material Selection</h4>
                  <p className="text-gray-600">Careful selection of premium seasoned hardwood with optimal moisture content.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-800 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Precision Manufacturing</h4>
                  <p className="text-gray-600">Advanced machinery ensures consistent dimensions and smooth finishing.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-800 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Quality Testing</h4>
                  <p className="text-gray-600">Rigorous inspection of each unit for durability, balance, and finish quality.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-800 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Packaging & Delivery</h4>
                  <p className="text-gray-600">Secure packaging and efficient logistics for safe delivery worldwide.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-700 to-orange-800 rounded-2xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Consistent quality with stringent quality control</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Competitive pricing for bulk orders</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Reliable delivery timelines</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Customization options available</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Sustainable and eco-friendly practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <span>Excellent customer support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
