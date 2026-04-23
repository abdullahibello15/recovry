import { Link } from "react-router";
import { Shield, Award, Users, Globe, Target, Heart, Briefcase, TrendingUp } from "lucide-react";

export function AboutUs() {
  const values = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Trust & Integrity",
      description: "We operate with complete transparency and honesty in every case we handle.",
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Compassion",
      description: "We understand the emotional toll of being scammed and treat every client with empathy.",
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Excellence",
      description: "Our team consists of top experts in financial recovery, law, and cyber investigation.",
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: "Results-Driven",
      description: "We're committed to achieving the best possible outcome for every client.",
    },
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Clients Served" },
    { icon: <DollarSign className="w-8 h-8" />, number: "$50M+", label: "Funds Recovered" },
    { icon: <Globe className="w-8 h-8" />, number: "45+", label: "Countries" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "95%", label: "Success Rate" },
  ];

  const team = [
    {
      role: "Financial Recovery Experts",
      description: "Specialists in tracing and recovering funds across international banking systems and cryptocurrency networks.",
    },
    {
      role: "Legal Advisors",
      description: "Experienced attorneys who understand financial fraud law and coordinate with law enforcement worldwide.",
    },
    {
      role: "Cyber Investigators",
      description: "Digital forensics experts who track scammers and gather evidence for recovery efforts.",
    },
    {
      role: "Client Support Specialists",
      description: "Compassionate professionals who guide you through every step of the recovery process.",
    },
  ];

  return (
    <div>
      <section className="bg-[#0a0f2c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About FundRecovery Pro</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading experts in fund recovery with over a decade of experience helping victims of online scams
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#0a0f2c] mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At FundRecovery Pro, we're dedicated to helping victims of online scams and cyber fraud recover their hard-earned money. We understand that being scammed is not just a financial loss—it's an emotional trauma that affects your trust and security.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Since our founding in 2016, we've helped over 500 clients recover more than $50 million from various types of online fraud. Our team of financial experts, legal professionals, and cyber investigators work tirelessly to track down scammers and recover stolen funds.
              </p>
              <p className="text-lg text-gray-600">
                We believe everyone deserves a second chance to get their money back, which is why we operate on a no-win, no-fee basis. You only pay if we successfully recover your funds.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-[#0a0f2c] mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a0f2c]">10+ Years of Experience</p>
                    <p className="text-gray-600 text-sm">Proven track record in fund recovery</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a0f2c]">Licensed & Regulated</p>
                    <p className="text-gray-600 text-sm">Fully compliant with financial regulations</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a0f2c]">Global Reach</p>
                    <p className="text-gray-600 text-sm">We handle cases in 45+ countries</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#f0a500] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#0a0f2c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a0f2c]">Expert Team</p>
                    <p className="text-gray-600 text-sm">Financial, legal, and cyber experts</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all text-center">
                <div className="text-[#f0a500] flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#0a0f2c] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0f2c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[#f0a500] flex justify-center mb-3">{stat.icon}</div>
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">Our Expert Team</h2>
            <p className="text-xl text-gray-600">Specialists dedicated to your recovery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#f0a500]">
                <h3 className="text-2xl font-bold text-[#0a0f2c] mb-3">{member.role}</h3>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0a0f2c] mb-6">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Join hundreds of satisfied clients who have recovered their funds with our help
          </p>
          <Link
            to="/consultation"
            className="inline-block bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-12 py-5 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
          >
            Start Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
