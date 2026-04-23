import { Link } from "react-router";
import { Phone, FileText, Search, Users, Gavel, DollarSign, CheckCircle, Clock, Shield } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <Phone className="w-12 h-12" />,
      title: "Initial Contact",
      description: "Reach out to us via phone, email, or our online form. Our team is available 24/7 to take your call.",
      timeline: "Day 1",
      details: [
        "Free consultation call",
        "No obligation to proceed",
        "Completely confidential",
        "Available 24/7",
      ],
    },
    {
      number: 2,
      icon: <FileText className="w-12 h-12" />,
      title: "Case Submission",
      description: "Provide us with all relevant documentation including transaction records, communications, and evidence.",
      timeline: "Day 1-2",
      details: [
        "Secure document upload",
        "Transaction history",
        "Communication records",
        "Any available evidence",
      ],
    },
    {
      number: 3,
      icon: <Search className="w-12 h-12" />,
      title: "Investigation & Analysis",
      description: "Our expert team analyzes your case, traces the funds, and identifies the best recovery strategy.",
      timeline: "Week 1-2",
      details: [
        "Fund tracing",
        "Scammer identification",
        "Pattern analysis",
        "Strategy development",
      ],
    },
    {
      number: 4,
      icon: <Users className="w-12 h-12" />,
      title: "Case Review Meeting",
      description: "We present our findings and proposed recovery plan. You decide whether to proceed.",
      timeline: "Week 2",
      details: [
        "Detailed case review",
        "Recovery probability",
        "Timeline estimate",
        "Fee structure",
      ],
    },
    {
      number: 5,
      icon: <Gavel className="w-12 h-12" />,
      title: "Recovery Action",
      description: "We coordinate with banks, payment processors, regulators, and legal authorities to recover your funds.",
      timeline: "Week 3-12",
      details: [
        "Bank coordination",
        "Legal proceedings",
        "Regulatory complaints",
        "International cooperation",
      ],
    },
    {
      number: 6,
      icon: <DollarSign className="w-12 h-12" />,
      title: "Fund Recovery & Payment",
      description: "Once funds are recovered, they're returned to you minus our agreed-upon fee.",
      timeline: "Variable",
      details: [
        "Secure fund transfer",
        "Transparent accounting",
        "Final documentation",
        "Case closure",
      ],
    },
  ];

  const expectations = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timeline Expectations",
      description: "Most cases are resolved within 3-6 months, though complex international cases may take longer.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Confidentiality Guaranteed",
      description: "Your case is handled with complete discretion. We never share your information without consent.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "No Win, No Fee",
      description: "You only pay our fee if we successfully recover your funds. No upfront costs.",
    },
  ];

  return (
    <div>
      <section className="bg-[#0a0f2c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our proven 6-step process for recovering your funds from online scams
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-[#f0a500] w-20 h-20 rounded-full flex items-center justify-center text-[#0a0f2c] font-bold text-2xl">
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-50 p-8 rounded-xl">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-[#0a0f2c]">{step.icon}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-[#0a0f2c]">{step.title}</h3>
                          <span className="bg-[#0a0f2c] text-white px-3 py-1 rounded-full text-sm">
                            {step.timeline}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6">{step.description}</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-[#f0a500]" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-10 top-20 w-0.5 h-12 bg-[#f0a500]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">What to Expect</h2>
            <p className="text-xl text-gray-600">Important information about the recovery process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expectations.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
                <div className="text-[#f0a500] flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#0a0f2c] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a0f2c] text-white p-12 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Recovery?</h2>
            <p className="text-xl text-gray-300 mb-8">
              The sooner you act, the better your chances of recovery
            </p>
            <Link
              to="/consultation"
              className="inline-block bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-12 py-5 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
            >
              Get Free Consultation Now
            </Link>
            <p className="mt-6 text-gray-400 text-sm">Available 24/7 • No obligation • Completely confidential</p>
          </div>
        </div>
      </section>
    </div>
  );
}
