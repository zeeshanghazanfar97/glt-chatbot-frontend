import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, ArrowRight, MessageCircle, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="GLT Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-800">Girlz Love Tech</span>
            </div>
            <button
              onClick={() => navigate(isAuthenticated ? '/' : '/login')}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              {isAuthenticated ? 'Open App' : 'Login'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Your Personal Guide for
            <span className="text-pink-500"> Wellness & Growth</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A safe space for young girls to learn, grow, and thrive with personalized guidance on wellness, 
            hygiene, and future opportunities.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-3 rounded-lg
              hover:from-pink-500 hover:to-pink-600 transition-all transform hover:scale-105
              flex items-center gap-2 mx-auto"
          >
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="text-pink-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Wellness</h3>
            <p className="text-gray-600">
              Get confidential guidance on hygiene, emotional well-being, and self-care practices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-pink-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Access our AI assistant anytime for instant answers to your questions and concerns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="text-pink-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Products</h3>
            <p className="text-gray-600">
              Access to hygiene kits and wellness products, with options for free supplies for those in need.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>Developed with ❤️ by ZeeIT Tech Solutions</p>
            <a 
              href="mailto:me@izeeshan.dev"
              className="text-pink-500 hover:text-pink-600 transition-colors"
            >
              me@izeeshan.dev
            </a>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 bg-pink-500 text-white p-4 rounded-full shadow-lg
            hover:bg-pink-600 transition-colors z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl z-50
          flex flex-col overflow-hidden border border-pink-100">
          <div className="bg-gradient-to-r from-pink-400 to-pink-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Heart size={20} />
              <span className="font-medium">Chat with GLT</span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <ChatWidget />
        </div>
      )}
    </div>
  );
};

export default LandingPage;