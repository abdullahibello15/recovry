import { Link } from "react-router";
import {
  Shield,
  Users,
  Zap,
  Lock,
  DollarSign,
  Heart,
  TrendingUp,
  Wallet,
  Building2,
  Dice5,
  Mail,
  Briefcase,
  CheckCircle,
  Star,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAuth } from "../../AuthContext";

export function Homepage() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <div>
      <HeroSection />
      {!isLoading && isAuthenticated ? (
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Access your {user?.role} dashboard to manage your cases.
            </p>
            <Link
              to="/dashboard"
              className="bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 inline-block"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ScamTypesSection />
          <HowItWorksSection />
          <WhyChooseUsSection />
          <StatisticsSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </>
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-[#0a0f2c] text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Lost Money To Online Scams? <br />
            <span className="text-[#f0a500]">We Can Help You Recover It</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-10"
          >
            Expert fund recovery specialists with a proven track record
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link
              to="/consultation"
              className="bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Start Recovery
            </Link>
            <Link
              to="/consultation"
              className="bg-transparent border-2 border-[#f0a500] hover:bg-[#f0a500] hover:text-[#0a0f2c] text-[#f0a500] px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Free Consultation
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-gray-400 mb-4">Portal Access</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Admin Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Client Sign Up
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-[#f0a500] mb-2" />
              <p className="font-bold text-2xl">500+</p>
              <p className="text-gray-400">Clients Helped</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-[#f0a500] mb-2" />
              <p className="font-bold text-2xl">95%</p>
              <p className="text-gray-400">Success Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-[#f0a500] mb-2" />
              <p className="font-bold text-2xl">24/7</p>
              <p className="text-gray-400">Support</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScamTypesSection() {
  const scamTypes = [
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Crypto & Bitcoin Scams",
      emoji: "🪙",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Romance Scams",
      emoji: "💕",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Investment Fraud",
      emoji: "📈",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Forex Scams",
      emoji: "💱",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Bank Wire Fraud",
      emoji: "🏦",
    },
    {
      icon: <Dice5 className="w-8 h-8" />,
      title: "Online Casino Fraud",
      emoji: "🎰",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Phishing Attacks",
      emoji: "📧",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Ponzi Schemes",
      emoji: "💼",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">
            Types of Scams We Handle
          </h2>
          <p className="text-xl text-gray-600">
            We specialize in recovering funds from all types of online fraud
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scamTypes.map((scam, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="text-4xl mb-3">{scam.emoji}</div>
              <h3 className="font-semibold text-lg text-[#0a0f2c]">
                {scam.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Free Consultation",
      description: "Tell us your case",
      detail:
        "Contact us for a confidential consultation. Share the details of your situation and we'll assess your case at no cost.",
    },
    {
      number: "02",
      title: "Case Review",
      description: "Our experts analyze your situation",
      detail:
        "Our experienced team conducts a thorough investigation and develops a customized recovery strategy for your case.",
    },
    {
      number: "03",
      title: "Fund Recovery",
      description: "We pursue and recover your funds",
      detail:
        "We take action to recover your funds using legal channels and our extensive network of financial institutions.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Simple 3-step process to get your money back
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-[#0a0f2c] text-white p-8 rounded-xl h-full">
                <div className="text-6xl font-bold text-[#f0a500] opacity-20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-[#f0a500] mb-4 font-semibold">
                  {step.description}
                </p>
                <p className="text-gray-300">{step.detail}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#f0a500]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-[#f0a500]" />,
      title: "Licensed & Regulated",
      description:
        "Fully licensed and compliant with international financial regulations",
    },
    {
      icon: <Lock className="w-12 h-12 text-[#f0a500]" />,
      title: "100% Confidential",
      description:
        "Your information is protected with bank-level encryption and security",
    },
    {
      icon: <Zap className="w-12 h-12 text-[#f0a500]" />,
      title: "Fast Recovery Process",
      description: "Our streamlined process ensures quick action on your case",
    },
    {
      icon: <DollarSign className="w-12 h-12 text-[#f0a500]" />,
      title: "No Recovery No Fee",
      description: "You only pay if we successfully recover your funds",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600">
            Trust the experts with your recovery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-[#0a0f2c] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatisticsSection() {
  const [counters, setCounters] = useState({
    funds: 0,
    clients: 0,
    success: 0,
    experience: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 },
    );

    const element = document.getElementById("statistics-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      funds: 50,
      clients: 500,
      success: 95,
      experience: 10,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        funds: Math.floor(targets.funds * progress),
        clients: Math.floor(targets.clients * progress),
        success: Math.floor(targets.success * progress),
        experience: Math.floor(targets.experience * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);
  };

  return (
    <section id="statistics-section" className="py-20 bg-[#0a0f2c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-[#f0a500] mb-2">
              ${counters.funds}M+
            </p>
            <p className="text-xl text-gray-300">Funds Recovered</p>
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-[#f0a500] mb-2">
              {counters.clients}+
            </p>
            <p className="text-xl text-gray-300">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-[#f0a500] mb-2">
              {counters.success}%
            </p>
            <p className="text-xl text-gray-300">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-5xl md:text-6xl font-bold text-[#f0a500] mb-2">
              {counters.experience}+
            </p>
            <p className="text-xl text-gray-300">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      scamType: "Romance Scam",
      amount: "$45,000",
      rating: 5,
      quote:
        "I thought my money was gone forever. The team at FundRecovery Pro was professional, understanding, and most importantly - they got my money back!",
    },
    {
      name: "Michael T.",
      scamType: "Crypto Investment Fraud",
      amount: "$120,000",
      rating: 5,
      quote:
        "After losing six figures to a crypto scam, I was devastated. These experts recovered 90% of my funds. I can't thank them enough.",
    },
    {
      name: "Jennifer L.",
      scamType: "Forex Trading Scam",
      amount: "$32,000",
      rating: 5,
      quote:
        "The consultation was free and they explained everything clearly. Within 3 months, they recovered my entire investment. Highly recommended!",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Real recoveries from real people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#f0a500] text-[#f0a500]"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-[#0a0f2c]">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.scamType}</p>
                <p className="text-[#f0a500] font-semibold mt-2">
                  Recovered: {testimonial.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does the recovery process take?",
      answer:
        "The timeline varies depending on the complexity of your case, but most recoveries are completed within 3-6 months. Simple cases may be resolved faster, while complex international fraud cases may take longer.",
    },
    {
      question: "What information do I need to provide?",
      answer:
        "We'll need details about the scam, any communication records with the scammers, transaction receipts, account information, and any other documentation related to your case. Don't worry - we'll guide you through everything during the consultation.",
    },
    {
      question: "How much does it cost?",
      answer:
        "We operate on a no-win, no-fee basis. You only pay if we successfully recover your funds. Our fee is a percentage of the recovered amount, which we'll discuss during your free consultation.",
    },
    {
      question: "Is my information safe?",
      answer:
        "Absolutely. We use bank-level encryption and follow strict confidentiality protocols. Your information is never shared with third parties without your explicit consent.",
    },
    {
      question: "What types of scams do you handle?",
      answer:
        "We handle all types of online fraud including crypto scams, romance scams, investment fraud, forex scams, phishing attacks, Ponzi schemes, binary options fraud, and more.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a0f2c] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-left text-[#0a0f2c]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#f0a500] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-[#0a0f2c] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready To Get Your Money Back?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Start your free consultation today - no obligation, 100% confidential
        </p>
        <Link
          to="/consultation"
          className="inline-block bg-[#f0a500] hover:bg-[#d89400] text-[#0a0f2c] px-12 py-5 rounded-lg font-bold text-xl transition-all transform hover:scale-105"
        >
          Get Free Consultation
        </Link>
        <p className="mt-8 text-gray-400">
          No recovery, no fee - You only pay if we get your money back
        </p>
      </div>
    </section>
  );
}
