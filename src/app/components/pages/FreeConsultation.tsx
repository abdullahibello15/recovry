import { Shield, Lock, Clock, CheckCircle, Phone } from "lucide-react";

export function FreeConsultation() {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Obligation",
      description: "Get expert advice with zero commitment to proceed",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "100% Confidential",
      description: "Your information is protected and never shared",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Response",
      description: "We'll contact you within 24 hours or less",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Expert Assessment",
      description: "Get a professional evaluation of your case",
    },
  ];

  return (
    <div>
      <section className="bg-[#0a0f2c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Free Consultation</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get expert advice on your case at no cost. We'll assess your situation and explain your recovery options.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-[#f0a500] flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="font-bold text-[#0a0f2c] mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-3xl font-bold text-[#0a0f2c] mb-6">Request Your Free Consultation</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our recovery specialists will contact you within 24 hours to discuss your case.
              </p>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Type of Scam *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none">
                    <option value="">Select scam type</option>
                    <option value="crypto">Crypto & Bitcoin Scam</option>
                    <option value="romance">Romance Scam</option>
                    <option value="investment">Investment Fraud</option>
                    <option value="forex">Forex Trading Scam</option>
                    <option value="bank">Bank Wire Fraud</option>
                    <option value="casino">Online Casino Fraud</option>
                    <option value="phishing">Phishing Attack</option>
                    <option value="ponzi">Ponzi Scheme</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Amount Lost *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none">
                    <option value="">Select amount range</option>
                    <option value="under5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-250k">$100,000 - $250,000</option>
                    <option value="over250k">Over $250,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#0a0f2c] mb-2">Brief Description of Incident *</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0a500] focus:border-transparent outline-none resize-none"
                    placeholder="Please provide details about what happened, when it occurred, and any other relevant information..."
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    I agree to the privacy policy and consent to be contacted about my case. All information provided will be kept strictly confidential.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                  Get Free Consultation
                </button>

                <p className="text-center text-sm text-gray-500">
                  By submitting this form, you agree to our terms and conditions. We'll never share your information with third parties.
                </p>
              </form>
            </div>

            <div>
              <div className="bg-[#0a0f2c] text-white p-8 rounded-xl mb-8">
                <h3 className="text-2xl font-bold mb-6">What Happens Next?</h3>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#f0a500] rounded-full flex items-center justify-center font-bold text-[#0a0f2c]">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">We Review Your Case</h4>
                      <p className="text-gray-300 text-sm">
                        Our team carefully reviews your submission and assesses the situation
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#f0a500] rounded-full flex items-center justify-center font-bold text-[#0a0f2c]">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">We Contact You</h4>
                      <p className="text-gray-300 text-sm">
                        A recovery specialist reaches out within 24 hours to discuss your case
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#f0a500] rounded-full flex items-center justify-center font-bold text-[#0a0f2c]">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Free Consultation Call</h4>
                      <p className="text-gray-300 text-sm">
                        We explain your options, recovery probability, and answer all questions
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#f0a500] rounded-full flex items-center justify-center font-bold text-[#0a0f2c]">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">You Decide</h4>
                      <p className="text-gray-300 text-sm">
                        No pressure—you choose whether to proceed with our recovery services
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl mb-8">
                <Phone className="w-12 h-12 text-[#f0a500] mb-4" />
                <h3 className="text-xl font-bold text-[#0a0f2c] mb-3">Prefer to Talk Now?</h3>
                <p className="text-gray-600 mb-6">
                  Our recovery specialists are available 24/7. Call us now for immediate assistance.
                </p>
                <a
                  href="tel:+18001234567"
                  className="inline-block bg-[#0a0f2c] hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  +1 (800) 123-4567
                </a>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                <h4 className="font-bold text-green-900 mb-2">Why Act Quickly?</h4>
                <p className="text-green-800 text-sm">
                  Time is critical in fund recovery cases. The sooner we start investigating and tracing your funds, the higher your chances of successful recovery. Scammers move money quickly—don't give them more time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0a0f2c] mb-4">Trusted by 500+ Clients Worldwide</h2>
            <div className="flex justify-center gap-8 mt-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-[#f0a500]">95%</p>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#f0a500]">$50M+</p>
                <p className="text-gray-600">Recovered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-[#f0a500]">24/7</p>
                <p className="text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
