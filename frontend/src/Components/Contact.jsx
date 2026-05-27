import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Building2,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { message } from "antd";
import { apiRequest } from "../CommonUtilities/CommonFunctions";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialState = {
    first_name: "",
    last_name: "",
    full_name: "",
    email: "",
    phone_number: "",
    company: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialState);

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name) {
      return "First and Last name are required";
    }

    if (!formData.email.includes("@")) {
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

    const payload = {
      ...formData,
      full_name: `${formData.first_name} ${formData.last_name}`.trim(),
    };

    const res = await apiRequest({
      endpoint: "/contact",
      method: "POST",
      body: payload,
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

  const contactInfo = [
    {
      icon: <Phone size={22} />,
      title: "Phone",
      lines: ["+91 982 590 2743", "+91 738 361 5985"],
    },
    {
      icon: <Mail size={22} />,
      title: "Email",
      lines: ["sales@woodfloatpro.com", "info@woodfloatpro.com"],
    },
    {
      icon: <MapPin size={22} />,
      title: "Location",
      lines: ["Industrial Area, Ahmedabad"],
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm px-12 py-4 text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-700 focus:ring-4 focus:ring-amber-100 shadow-sm";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/40 to-white py-24"
    >
      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-800">
            CONTACT US
          </span>

          <h2 className="mb-6 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            Let’s Build Something Great Together
          </h2>

          <p className="text-lg leading-relaxed text-gray-600">
            Have a project in mind or need product information? Our team is
            ready to help you with the best solutions.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mb-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-white/40 bg-white/70 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-700 to-orange-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <div className="space-y-1">
                {item.lines.map((line, idx) => (
                  <p key={idx} className="text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/60 p-8 shadow-2xl backdrop-blur-xl md:p-14">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-amber-50/30" />

          <form
            onSubmit={handleSubmit}
            className="relative z-10 mx-auto max-w-4xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* First Name */}
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={inputClass}
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={inputClass}
                />
              </div>

              {/* Company */}
              <div className="relative">
                <Building2
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Message */}
            <div className="relative mt-6">
              <MessageSquare
                size={20}
                className="absolute left-4 top-5 text-gray-400"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-2xl border border-gray-200 bg-white/70 py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-amber-700 focus:ring-4 focus:ring-amber-100 shadow-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-8 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-700 to-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending Message...
                </div>
              ) : (
                <>
                  Send Message
                  <Send
                    size={20}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}