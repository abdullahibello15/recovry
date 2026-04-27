import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { api } from "../../api";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone",
      detail: "+1 (800) 123-4567",
      description: "Available 24/7 for emergency cases",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      detail: "support@fundrecoverypro.com",
      description: "Response within 24 hours",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Office",
      detail: "123 Recovery Street, NY 10001",
      description: "Monday - Friday: 9AM - 6PM EST",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Emergency Hotline",
      detail: "+1 (800) 911-SCAM",
      description: "24/7 immediate assistance",
    },
  ];

  const updateField = (field: keyof typeof initialFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setSubmitError("Please complete your name, email, and phone number.");
      return;
    }

    if (form.message.trim().length < 10) {
      setSubmitError("Please enter a short message with at least 10 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post<{ message: string }>("/contact-submissions", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });
      setForm(initialFormState);
      setSubmitSuccess(response.message);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not send your message right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-[#0a0f2c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re here to help 24/7. Reach out to us through any of these channels.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all">
                <div className="text-[#f0a500] flex justify-center mb-4">{method.icon}</div>
                <h3 className="font-bold text-[#0a0f2c] mb-2">{method.title}</h3>
                <p className="text-lg font-semibold text-[#0a0f2c] mb-2">{method.detail}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0a0f2c] mb-6">Quick Contact Form</h2>
              <p className="text-gray-600 mb-8">
                Fill out this form and we&apos;ll get back to you within 24 hours. For urgent cases, please call our hotline.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none"
                    placeholder="+1 (555) 123-4567"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none"
                    placeholder="Inquiry about recovery services"
                    value={form.subject}
                    onChange={(event) => updateField("subject", event.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Message *</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none resize-none"
                    placeholder="Tell us about your situation..."
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    required
                  />
                </div>

                {submitError ? (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                ) : null}

                {submitSuccess ? (
                  <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {submitSuccess}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="w-full bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:transform-none disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div>
              <div className="bg-[#0a0f2c] text-white p-8 rounded-xl mb-8">
                <h3 className="text-2xl font-bold mb-4">Why Contact Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Free consultation with no obligation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>100% confidential conversation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Expert advice from recovery specialists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Immediate case assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>24/7 emergency support available</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl">
                <MessageSquare className="w-12 h-12 text-[#f0a500] mb-4" />
                <h3 className="text-xl font-bold text-[#0a0f2c] mb-3">Prefer a Free Consultation?</h3>
                <p className="text-gray-600 mb-6">
                  Schedule a detailed consultation where we can discuss your case in depth and provide a customized recovery plan.
                </p>
                <Link
                  to="/consultation"
                  className="inline-block bg-[#0a0f2c] hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a0f2c] text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Time is Critical in Fund Recovery</h2>
            <p className="text-xl text-gray-300 mb-8">
              The sooner you contact us, the better your chances of recovery. Don&apos;t wait, act now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+18001234567"
                className="bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-8 py-4 rounded-lg font-bold text-lg transition-all"
              >
                Call Now: +1 (800) 123-4567
              </a>
              <Link
                to="/consultation"
                className="bg-transparent border-2 border-[#f0a500] hover:bg-[#f0a500] hover:text-[#0a0f2c] text-[#f0a500] px-8 py-4 rounded-lg font-bold text-lg transition-all"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
