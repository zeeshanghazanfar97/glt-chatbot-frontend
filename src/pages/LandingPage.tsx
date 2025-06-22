import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, Code, Sparkles, Shield, Users, Award, Calendar, Gift, BookOpen, Bot, Zap, Brain, Target } from 'lucide-react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const features = [
  {
    title: "AI-Powered Wellness Support",
    desc: "Get instant, personalized guidance on hygiene, health, and wellness from our intelligent chatbot available 24/7.",
    icon: <Bot className="w-6 h-6" />,
    color: "from-purple-400 to-pink-400"
  },
  {
    title: "Smart Product Recommendations",
    desc: "Receive tailored product suggestions based on your needs, with detailed information and trusted reviews.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-blue-400 to-cyan-400"
  },
  {
    title: "Educational Conversations",
    desc: "Learn about technology, career paths, and life skills through engaging, age-appropriate conversations.",
    icon: <Brain className="w-6 h-6" />,
    color: "from-pink-400 to-rose-400"
  },
  {
    title: "Safe & Confidential",
    desc: "Chat in a secure environment designed specifically for young women, with privacy and safety as our top priorities.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-orange-400 to-yellow-400"
  }
];

const DeveloperBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="fixed left-4 bottom-4 z-50">
      <div
        className={`
          relative overflow-hidden cursor-pointer
          bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8]
          rounded-full shadow-xl transition-all duration-500 ease-out
          hover:shadow-2xl hover:scale-105
          ${isExpanded ? 'rounded-2xl px-6 py-4' : 'w-14 h-14'}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] animate-gradient-x"></div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-2 left-3 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-3 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative z-10 flex items-center text-white">
          <div className={`flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'mr-3' : 'mx-auto'
          }`}>
            <Code className={`transition-all duration-300 ${isExpanded ? 'w-5 h-5' : 'w-6 h-6'}`} />
          </div>
          <div className={`
            transition-all duration-500 overflow-hidden
            ${isExpanded ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'}
          `}>
            <div className="whitespace-nowrap">
              <div className="text-sm font-semibold mb-1">
                Crafted with ❤️
              </div>
              <div className="text-xs opacity-90">
                by{' '}
                <a
                  href="https://zeeit.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-pink-200 transition-colors font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  ZeeIT Solutions
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0
          transition-all duration-1000 transform -skew-x-12
          ${isHovered ? 'animate-shine' : ''}
        `}></div>
      </div>
      
      {!isExpanded && isHovered && (
        <div className="absolute left-16 bottom-4 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap animate-fadeIn">
          Developed by ZeeIT Solutions
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ feature, index }) => {
  return (
    <div className={`
      group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl 
      transition-all duration-500 hover:-translate-y-2 cursor-pointer
      border border-gray-100 hover:border-pink-200
    `}
    style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`
        absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
        group-hover:opacity-5 transition-opacity duration-500
      `}></div>
      
      <div className="relative z-10">
        <div className={`
          inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
          bg-gradient-to-br ${feature.color} text-white shadow-lg
          group-hover:scale-110 transition-transform duration-300
        `}>
          {feature.icon}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
          {feature.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {feature.desc}
        </p>
      </div>
      
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-100 to-transparent opacity-50 rounded-bl-full"></div>
    </div>
  );
};

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm GLT, your AI wellness assistant. I can help with hygiene tips, product recommendations, tech education, and career guidance. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    if (isWidgetOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isWidgetOpen]);

  useEffect(() => {
    FingerprintJS.load().then(fp => {
      fp.get().then(result => {
        setVisitorId(result.visitorId);
      });
    });
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    
    try {
      const bodyPayload = {
        message: userMsg,
        visitorId
      };

      const res = await fetch('https://api.girlzlovetech.org/api/public-chatbot/message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });
      
      if (res.status === 429) {
        const data = await res.json();
        setMessages(msgs => [...msgs, { from: 'bot', text: data.error || "You are sending messages too quickly. Please wait and try again." }]);
        return;
      }
      
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: 'bot', text: data.response || "Sorry, I didn't get that." }]);
    } catch {
      setMessages(msgs => [...msgs, { from: 'bot', text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleTopButtonClick = () => {
    if (isAuthenticated) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-pink-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/2 -left-4 w-96 h-96 bg-purple-200 rounded-full opacity-15 animate-float-delayed"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 rounded-full opacity-10 animate-float"></div>
      </div>

      <nav className="relative z-40 w-full flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-xl shadow-sm fixed top-0 left-0 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FC7DAF] to-[#FFA4C8] rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] bg-clip-text text-transparent">
              Girlz Love Tech
            </span>
            <div className="text-xs text-gray-500 -mt-1">AI Wellness Assistant</div>
          </div>
        </div>
        
        <button
          className="group relative overflow-hidden bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] hover:from-[#E76694] hover:to-[#FF9DBF] text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          onClick={handleTopButtonClick}
        >
          <span className="relative z-10">
            {isAuthenticated ? "Open App" : "Login"}
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </button>
      </nav>

      <section className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-6 md:px-16 pt-32 pb-16">
        <div className="flex-1 space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Meet Your AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] bg-clip-text text-transparent">
                Wellness Assistant
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Get instant, personalized guidance on wellness, hygiene, technology, and career paths. 
              Our AI chatbot is designed specifically for young women, providing safe, confidential, 
              and age-appropriate support 24/7.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/register')}
              className="group relative overflow-hidden bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] hover:from-[#E76694] hover:to-[#FF9DBF] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey
                <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </span>
            </button>
            
            <button
              className="group flex items-center gap-2 bg-white/80 hover:bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm border border-gray-200"
              onClick={() => navigate('/learn-more')}
            >
              <Target className="w-4 h-4" />
              More Details
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-md hover:scale-105 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FC7DAF] to-[#FFA4C8] rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">GLT Assistant</h3>
                  <p className="text-sm text-gray-500">Always here to help</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-2xl p-4">
                  <p className="text-sm text-gray-700">
                    "Hi! I can help you with hygiene tips, product recommendations, 
                    tech education, and career guidance. What would you like to know?"
                  </p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                    Wellness Tips
                  </span>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                    Tech Careers
                  </span>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                    Product Help
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-16 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powered by 
            <span className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] bg-clip-text text-transparent"> AI Intelligence</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the future of personalized wellness support through our advanced chatbot
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-16 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] rounded-3xl px-8 py-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Chat with GLT?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of young women who trust GLT for personalized wellness guidance, 
              educational support, and confident decision-making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start Chatting Now
              </button>
              <button
                onClick={() => setIsWidgetOpen(true)}
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Try Demo Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        {!isWidgetOpen && (
          <button
            className="group relative bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] hover:from-[#E76694] hover:to-[#FF9DBF] text-white rounded-full shadow-xl p-4 transition-all duration-300 hover:shadow-2xl hover:scale-110"
            onClick={() => setIsWidgetOpen(true)}
          >
            <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </button>
        )}

        {isWidgetOpen && (
          <div className="w-80 max-w-[90vw] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden animate-slideUp">
            <div className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-white font-semibold">GLT Assistant</span>
                  <div className="text-white/80 text-xs">Your AI wellness guide</div>
                </div>
              </div>
              <button
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all"
                onClick={() => setIsWidgetOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto max-h-80 min-h-48">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm max-w-xs ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm bg-white/80 backdrop-blur-sm"
                  placeholder="Ask about wellness, tech, careers..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleInputKey}
                  disabled={loading}
                />
                <button
                  className="bg-gradient-to-r from-[#FC7DAF] to-[#FFA4C8] hover:from-[#E76694] hover:to-[#FF9DBF] text-white rounded-2xl p-3 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeveloperBadge />

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-30px); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient-x { 
          background-size: 200% 200%; 
          animation: gradient-x 3s ease infinite; 
        }
        
        .animate-shine { animation: shine 0.6s ease-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite 2s; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default LandingPage;