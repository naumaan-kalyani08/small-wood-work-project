import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { message } from 'antd';
import { apiRequest } from '../utils/apiRequest'; // use your enhanced API

export default function Contact() {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState = {
    first_name: '',
    last_name: '',
    full_name: '',
    email: '',
    phone_number: '',
    company: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialState);

  // ✅ Validation
  const validateForm = () => {
    if (!formData.first_name || !formData.last_name) {
      return "First and Last name are required";
    }
    if (!formData.email.includes('@')) {
      return "Invalid email address";
    }
    if (!formData.message) {
      return "Message cannot be empty";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const error = validateForm();
    if (error) {
      message.error(error);
      return;
    }

    setIsSubmitting(true);

    // ✅ FIX: compute full_name locally (not relying on async state)
    const payload = {
      ...formData,
      full_name: `${formData.first_name} ${formData.last_name}`.trim()
    };

    const res = await apiRequest({
      endpoint: "/contact",
      method: "POST",
      body: payload
    });

    setIsSubmitting(false);

    if (!res.success) return;

    message.success("Thank you! We'll contact you soon 🚀");
    setFormData(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "first_name" || name === "last_name") {
        updated.full_name =
          `${updated.first_name} ${updated.last_name}`.trim();
      }

      return updated;
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to order or have questions? Contact us today.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {[{
            icon: <Phone />,
            title: "Phone",
            lines: ["+91 982 590 2743", "+91 738 361 5985"]
          }, {
            icon: <Mail />,
            title: "Email",
            lines: ["sales@woodfloatpro.com", "info@woodfloatpro.com"]
          }, {
            icon: <MapPin />,
            title: "Location",
            lines: ["Industrial Area, Ahmedabad"]
          }].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-amber-800 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              {item.lines.map((line, idx) => (
                <p key={idx} className="text-gray-700">{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* FORM */}
        <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {["first_name", "last_name", "email", "company"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.replace('_', ' ').toUpperCase()}
                  className="input"
                />
              ))}
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your message..."
              className="w-full px-4 py-3 rounded-lg border"
            />

            <button
              disabled={isSubmitting}
              className="btn-primary w-full mt-6 flex justify-center items-center"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="ml-2" size={20} />
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}