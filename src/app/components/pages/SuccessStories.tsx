import { Link } from "react-router";
import { Star, CheckCircle } from "lucide-react";

export function SuccessStories() {
  const stories = [
    {
      name: "Sarah M.",
      location: "California, USA",
      scamType: "Romance Scam",
      amount: "$45,000",
      recovered: "$42,500",
      rating: 5,
      date: "February 2026",
      story: "I met someone online who seemed perfect. After three months, they convinced me to invest in a 'business opportunity.' I transferred $45,000 before realizing it was all fake. I was devastated and embarrassed. FundRecovery Pro didn't judge me—they understood and got to work immediately. Within 4 months, they recovered 95% of my money. I'm so grateful for their professionalism and compassion.",
      image: "👩",
    },
    {
      name: "Michael T.",
      location: "London, UK",
      scamType: "Crypto Investment Fraud",
      amount: "$120,000",
      recovered: "$108,000",
      rating: 5,
      date: "January 2026",
      story: "I invested in what appeared to be a legitimate cryptocurrency platform. After my portfolio showed great returns, I tried to withdraw and was blocked. The platform disappeared overnight. I thought my life savings were gone. FundRecovery Pro's team traced the blockchain transactions and worked with international authorities. They recovered 90% of my funds. I cannot thank them enough.",
      image: "👨",
    },
    {
      name: "Jennifer L.",
      location: "Toronto, Canada",
      scamType: "Forex Trading Scam",
      amount: "$32,000",
      recovered: "$32,000",
      rating: 5,
      date: "December 2025",
      story: "A 'broker' contacted me offering exclusive forex trading opportunities. The platform looked professional, and my account showed profits. When I requested a withdrawal, they demanded more fees. That's when I knew something was wrong. FundRecovery Pro took my case and recovered 100% of my investment within 3 months. The consultation was free, and they kept me informed every step of the way.",
      image: "👩",
    },
    {
      name: "Robert K.",
      location: "Sydney, Australia",
      scamType: "Investment Ponzi Scheme",
      amount: "$85,000",
      recovered: "$78,000",
      rating: 5,
      date: "November 2025",
      story: "I was introduced to an investment opportunity by a friend. It promised high returns and seemed legitimate for the first year. Then withdrawals stopped and the company vanished. I lost $85,000. FundRecovery Pro investigated the entire scheme and coordinated with other victims. They recovered most of my money through legal channels. Their expertise made all the difference.",
      image: "👨",
    },
    {
      name: "Amanda R.",
      location: "New York, USA",
      scamType: "Bitcoin Mining Scam",
      amount: "$58,000",
      recovered: "$51,000",
      rating: 5,
      date: "October 2025",
      story: "I invested in a cloud mining operation that turned out to be completely fake. No mining was happening—just money moving between accounts. I felt like an idiot for falling for it. The FundRecovery Pro team never made me feel that way. They were respectful, professional, and determined. They recovered 88% of my investment and helped me understand how these scams work so I won't fall for them again.",
      image: "👩",
    },
    {
      name: "David P.",
      location: "Singapore",
      scamType: "Online Casino Fraud",
      amount: "$28,000",
      recovered: "$26,500",
      rating: 5,
      date: "September 2025",
      story: "I won $28,000 on an online casino, but they refused to pay out, claiming I violated terms I never violated. They were just looking for excuses not to pay. FundRecovery Pro reviewed my case, verified the unfair practices, and filed complaints with gambling regulators. They got me my winnings plus my initial deposits back. Fantastic service.",
      image: "👨",
    },
  ];

  return (
    <div>
      <section className="bg-[#0a0f2c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real people, real recoveries. See how we've helped victims get their money back from scammers.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 bg-[#0a0f2c] text-white p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-6xl mb-4">{story.image}</div>
                      <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{story.location}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Scam Type:</span>
                          <span className="font-semibold">{story.scamType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount Lost:</span>
                          <span className="font-semibold text-red-400">{story.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Recovered:</span>
                          <span className="font-semibold text-[#f0a500]">{story.recovered}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Date:</span>
                          <span className="font-semibold">{story.date}</span>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#f0a500] text-[#f0a500]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <span className="text-green-700 font-semibold">Successfully Recovered</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg italic">"{story.story}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">Recovery Statistics</h2>
            <p className="text-xl text-gray-600">Our track record speaks for itself</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-[#f0a500] mb-2">500+</p>
              <p className="text-gray-600">Cases Handled</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-[#f0a500] mb-2">95%</p>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-[#f0a500] mb-2">$50M+</p>
              <p className="text-gray-600">Total Recovered</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-5xl font-bold text-[#f0a500] mb-2">45+</p>
              <p className="text-gray-600">Countries</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0f2c] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Your Success Story Starts Here</h2>
          <p className="text-xl text-gray-300 mb-10">
            Don't let scammers get away with your money. Let us help you recover what's yours.
          </p>
          <Link
            to="/consultation"
            className="inline-block bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-12 py-5 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
          >
            Start Your Recovery Today
          </Link>
          <p className="mt-6 text-gray-400">Free consultation • No win, no fee • 100% confidential</p>
        </div>
      </section>
    </div>
  );
}
