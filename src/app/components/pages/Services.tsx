import { Link } from "react-router";
import { Wallet, Heart, TrendingUp, DollarSign, Building2, Dice5, Mail, Briefcase, Shield, Clock, FileCheck, Search } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Wallet className="w-12 h-12" />,
      title: "Crypto & Bitcoin Scam Recovery",
      description: "Specialized recovery services for cryptocurrency fraud, fake ICOs, mining scams, and blockchain-related theft. We work with blockchain analysts to trace your funds.",
      features: ["Blockchain analysis", "Exchange cooperation", "Wallet tracing", "Smart contract disputes"],
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Romance Scam Recovery",
      description: "Compassionate support for victims of romance fraud. We understand the emotional impact and work discreetly to recover your funds from catfishing and love scams.",
      features: ["Confidential handling", "International tracking", "Identity verification", "Evidence gathering"],
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Investment Fraud Recovery",
      description: "Recovery from fake investment platforms, pyramid schemes, and fraudulent trading opportunities. We deal with unregulated brokers and fake fund managers.",
      features: ["Broker investigation", "Fund tracing", "Regulatory assistance", "Legal coordination"],
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Forex Trading Scam Recovery",
      description: "Specialized in recovering losses from forex scams, signal seller fraud, and manipulated trading platforms with unfair practices.",
      features: ["Platform analysis", "Trade verification", "Withdrawal disputes", "Regulatory reporting"],
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: "Bank Wire Fraud Recovery",
      description: "Expert assistance in recovering funds lost through wire transfer fraud, business email compromise, and banking scams.",
      features: ["Swift tracking", "Bank coordination", "Wire recall", "International transfers"],
    },
    {
      icon: <Dice5 className="w-12 h-12" />,
      title: "Online Casino Fraud Recovery",
      description: "Recovery from rigged online casinos, unfair gambling platforms, and withdrawal refusal cases.",
      features: ["License verification", "Game fairness audit", "Dispute resolution", "Regulatory complaints"],
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: "Phishing & Email Scam Recovery",
      description: "Help for victims of phishing attacks, email scams, and identity theft leading to financial losses.",
      features: ["Identity protection", "Account recovery", "Credit monitoring", "Fraud reporting"],
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Ponzi Scheme Recovery",
      description: "Recovery assistance for victims of Ponzi schemes, MLM fraud, and pyramid investment scams.",
      features: ["Asset tracing", "Beneficiary claims", "Class action support", "Receivership coordination"],
    },
  ];

  const process = [
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Documentation Review",
      description: "We review all your evidence, communications, and transaction records",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Investigation",
      description: "Our experts investigate the scam, trace funds, and identify responsible parties",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Legal Action",
      description: "We coordinate with legal authorities and financial institutions for recovery",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Recovery & Resolution",
      description: "We pursue all available channels to recover your funds and resolve your case",
    },
  ];

  return (
    <div>
      <section className="bg-[#0a0f2c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Recovery Services</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive fund recovery solutions for all types of online scams and cyber fraud
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
                <div className="text-[#f0a500] mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-[#0a0f2c] mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#f0a500] rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">Our Recovery Process</h2>
            <p className="text-xl text-gray-600">A systematic approach to getting your money back</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-[#0a0f2c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#f0a500]">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0a0f2c] mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0f2c] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Help With Your Case?</h2>
          <p className="text-xl text-gray-300 mb-10">Get a free consultation with our recovery specialists today</p>
          <Link
            to="/consultation"
            className="inline-block bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-12 py-5 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
          >
            Start Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
