import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Sparkles, 
  ArrowLeft,
  CheckCircle,
  Star,
  MessageCircle,
  BookOpen,
  Lightbulb,
  Target,
  Globe,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
const LearnMore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mission');
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Expert Wellness Guidance",
      description: "Get personalized advice from certified wellness experts who understand the unique challenges young girls face during their developmental years.",
      benefits: [
        "24/7 access to wellness professionals",
        "Age-appropriate health information",
        "Mental health support and resources",
        "Nutrition and fitness guidance"
      ],
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Comprehensive Hygiene Education",
      description: "Learn about personal hygiene, menstrual health, and safe practices through our interactive educational platform designed specifically for young women.",
      benefits: [
        "Menstrual health education",
        "Personal hygiene best practices",
        "Safe product recommendations",
        "Myth-busting and fact-checking"
      ],
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Trusted Product Marketplace",
      description: "Access a curated selection of hygiene and wellness products from verified suppliers, with discreet packaging and competitive pricing.",
      benefits: [
        "Quality-assured products",
        "Discreet and secure delivery",
        "Competitive pricing",
        "Product reviews and ratings"
      ],
      gradient: "from-pink-400 to-rose-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community & Support",
      description: "Join a safe, supportive community of young women sharing experiences, asking questions, and supporting each other's growth.",
      benefits: [
        "Moderated safe spaces",
        "Peer support networks",
        "Mentorship programs",
        "Success story sharing"
      ],
      gradient: "from-purple-400 to-indigo-500"
    }
  ];
  const stats = [
    { number: "10K+", label: "Young Women Supported", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" /> },
    { number: "24/7", label: "AI Support Available", icon: <MessageCircle className="w-6 h-6" /> },
    { number: "100+", label: "Educational Resources", icon: <BookOpen className="w-6 h-6" /> }
  ];
  const testimonials = [
    {
      name: "Sarah M.",
      age: 16,
      text: "GLT helped me understand my body better and gave me confidence to ask questions I was too embarrassed to ask elsewhere.",
      rating: 5
    },
    {
      name: "Maria L.",
      age: 18,
      text: "The product recommendations were perfect, and the educational content helped me make informed decisions about my health.",
      rating: 5
    },
    {
      name: "Emma K.",
      age: 17,
      text: "Having access to 24/7 support through the AI chatbot was a game-changer. I could get answers anytime I needed them.",
      rating: 5
    }
  ];
  const tabContent = {
    mission: {
      title: "Our Mission",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            At Girlz Love Tech, we believe every young woman deserves access to accurate health information, 
            quality wellness products, and a supportive community that empowers her to make informed decisions 
            about her body and future.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl">
              <Target className="w-8 h-8 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
              <p className="text-gray-">
                A world where every young woman has the knowledge, tools, and confidence to thrive 
                during her most formative years.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl">
              <Globe className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Impact</h3>
              <p className="text-gray-600">
                Breaking down barriers to health education and creating safe spaces for 
                learning and growth in the digital age.
              </p>
            </div>
          </div>
        </div>
      )
    },
    story: {
      title: "Our Story",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Girlz Love Tech was founded by a team of passionate educators, healthcare professionals, 
            and technologists who recognized a critical gap in accessible health education for young women.
          </p>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem We Solved</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Limited access to age-appropriate health education</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Embarrassment around asking sensitive health questions</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Difficulty finding trusted wellness products</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Lack of supportive peer communities</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    contact: {
      title: "Get in Touch",
      content: (
        <div className="space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            We'd love to hear from you! Whether you have questions, feedback, or need support, 
            our team is here to help.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-GIRL</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">support@girlzlovetech.com</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Wellness Ave, Health City</p>
            </div>
          </div>
        </div>
      )
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-pink-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/2 -left-4 w-96 h-96 bg-purple-200 rounded-full opacity-15 animate-float-delayed"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 rounded-full opacity-10 animate-float"></div>
      </div>
      {/* Navigation */}
      <nav className="relative z-40 w-full flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-xl shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FC7DAF] to-[#FFA4C8] rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] bg-clip-text text-transparent">
            Girlz Love Tech
          </span>
        </div>
        
        <button
          onClick={() => navigate('/register')}
          className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] hover:from-[#E76694] hover:to-[#FF9DBF] text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          Get Started
        </button>
      </nav>
      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Empowering Young Women
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] bg-clip-text text-transparent">
              Through Technology
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover how we're revolutionizing health education and wellness support 
            for the next generation of empowered women.
          </p>
        </div>
      </section>
      {/* Stats Section */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive 
              <span className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] bg-clip-text text-transparent"> Wellness Solutions</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need for a healthier, more confident you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg mb-6`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Young Women Say
              <span className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] bg-clip-text text-transparent"> About Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">{testimonial.name}</span>, Age {testimonial.age}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Tabbed Content Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              {Object.entries(tabContent).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {tabContent[activeTab].title}
              </h2>
              {tabContent[activeTab].content}
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] rounded-3xl px-8 py-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of young women who are taking control of their health and future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Get Started Today
              </button>
              <button
                onClick={() => navigate('/')}
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite 2s; }
      `}</style>
    </div>
  );
};
export default LearnMore;