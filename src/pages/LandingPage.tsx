import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send } from 'lucide-react';

const wellnessFeatures = [
  {
    title: "Wellness Guidance",
    desc: "Get expert advice on physical and mental wellness, tailored for young girls.",
    icon: "💡"
  },
  {
    title: "Hygiene Tips",
    desc: "Learn about personal hygiene, menstrual health, and safe practices.",
    icon: "🧼"
  },
  {
    title: "Product Ordering",
    desc: "Order hygiene and wellness products directly from our trusted partners.",
    icon: "🛍️"
  },
  {
    title: "Empowerment",
    desc: "Access resources, stories, and mentorship to inspire your future.",
    icon: "🌸"
  }
];

const DEV_REF_EMAIL = "me@izeeshan.dev";
const DEV_REF_NAME = "ZeeIT Tech Solutions";

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Chatbot widget state
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [messages, setMessages] = useState<{from: 'user'|'bot', text: string}[]>([
    { from: 'bot', text: "Hi! I'm your wellness chatbot. Ask me anything about hygiene, wellness, or products!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Developer Reference Badge state
  const [showDevRef, setShowDevRef] = useState(true);

  useEffect(() => {
    if (isWidgetOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isWidgetOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://glt-chat-backend.izeeshan.dev/api/public-chatbot/message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setMessages(msgs => [...msgs, { from: 'bot', text: data.response || "Sorry, I didn't get that." }]);
    } catch {
      setMessages(msgs => [...msgs, { from: 'bot', text: "Sorry, something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const handleInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  // Navigation handler for top-right button
  const handleTopButtonClick = () => {
    if (isAuthenticated) {
      navigate('/app');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col relative font-sans">
      {/* Top nav */}
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-30">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="GLT Logo" className="h-10 w-10 rounded-full shadow" />
          <span className="text-xl font-bold text-pink-600 tracking-tight">Girlz Love Tech</span>
        </div>
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all"
          onClick={handleTopButtonClick}
        >
          {isAuthenticated ? "Open App" : "Login"}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-6 md:px-16 pt-32 pb-12 md:pb-24">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Empowering Young Girls<br />
            <span className="text-pink-500">for a Healthier, Brighter Future</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
            Girlz Love Tech is your trusted companion for wellness, hygiene, and personal growth. 
            Get guidance, order essential products, and chat with our friendly AI for instant support—anytime, anywhere.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {wellnessFeatures.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <span className="font-semibold text-gray-800">{f.title}</span>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all"
            onClick={handleTopButtonClick}
          >
            {isAuthenticated ? "Open App" : "Login"}
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src="https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&w=600&h=600&fit=crop"
            alt="Wellness for girls"
            className="rounded-3xl shadow-2xl w-full max-w-xs md:max-w-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* Developer Reference Badge */}
      {showDevRef && (
        <div
          className="fixed left-0 top-1/2 z-50 -translate-y-1/2 flex flex-col items-center"
          style={{ minWidth: 0 }}
        >
          <div className="relative group">
            <div
              className="bg-gradient-to-br from-pink-500 to-pink-400 shadow-xl border-2 border-pink-200 rounded-r-3xl px-2 py-2 flex items-center"
              style={{
                minHeight: 120,
                minWidth: 44,
                borderTopLeftRadius: 24,
                borderBottomLeftRadius: 24,
                borderTopRightRadius: 36,
                borderBottomRightRadius: 36,
                boxShadow: '0 4px 24px 0 rgba(233,30,99,0.15)'
              }}
            >
              <span
                className="text-white font-bold tracking-wide text-sm select-none"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(-180deg)',
                  letterSpacing: '0.1em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.10)'
                }}
              >
                Developer Reference
              </span>
            </div>
            <button
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white text-pink-500 border border-pink-200 rounded-full shadow-md w-7 h-7 flex items-center justify-center hover:bg-pink-50 transition-all"
              aria-label="Close developer reference"
              onClick={() => setShowDevRef(false)}
              tabIndex={0}
              style={{ outline: 'none' }}
            >
              <span className="text-lg font-bold" style={{ lineHeight: 1 }}>×</span>
            </button>
            {/* Tooltip on hover */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-white border border-pink-200 rounded-lg shadow-lg px-4 py-2 text-xs text-gray-700 font-medium whitespace-nowrap">
                {DEV_REF_NAME}<br />
                <a
                  href={`mailto:${DEV_REF_EMAIL}`}
                  className="text-pink-500 hover:underline"
                  tabIndex={-1}
                >
                  {DEV_REF_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Public Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Widget button */}
        {!isWidgetOpen && (
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all"
            aria-label="Open Chatbot"
            onClick={() => setIsWidgetOpen(true)}
          >
            <MessageCircle size={28} />
          </button>
        )}
        {/* Widget panel */}
        {isWidgetOpen && (
          <div className="w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-pink-100 flex flex-col overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between bg-pink-500 px-4 py-3">
              <span className="text-white font-semibold">Wellness Chatbot</span>
              <button
                className="text-white hover:text-pink-200"
                aria-label="Close Chatbot"
                onClick={() => setIsWidgetOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 flex flex-col px-3 py-2 space-y-2 overflow-y-auto max-h-72" style={{ minHeight: 180 }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`px-3 py-2 rounded-xl text-sm shadow
                    ${msg.from === 'user'
                      ? 'bg-pink-100 text-pink-900'
                      : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="flex items-center border-t border-pink-100 px-2 py-2 bg-white">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleInputKey}
                disabled={loading}
                aria-label="Type your message"
              />
              <button
                className={`ml-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg p-2 transition-all flex items-center justify-center disabled:opacity-50`}
                onClick={handleSend}
                disabled={loading || !input.trim()}
                aria-label="Send"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
