import React from 'react';
import { Heart, Award, BookOpen, Sparkles } from 'lucide-react';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="animate-fadeIn space-y-8 py-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-pink-400 to-pink-500 
          rounded-2xl mb-4 shadow-lg text-white">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Welcome to Girlz Love Tech</h2>
        <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto">
          Your friendly guide for wellness, tech skills, and future careers. I'm here to help you navigate 
          your journey with confidence!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 
          border border-pink-100/50 hover:border-pink-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-pink-50 rounded-xl text-pink-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Wellness Tips</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get personalized advice on hygiene, emotional wellness, and self-care practices
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 
          border border-pink-100/50 hover:border-pink-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-pink-50 rounded-xl text-pink-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Tech Skills</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Discover the exciting world of computers, coding, and digital creativity
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 
          border border-pink-100/50 hover:border-pink-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-pink-50 rounded-xl text-pink-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Future Careers</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explore amazing career opportunities and get inspired by successful women in tech
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 
          border border-pink-100/50 hover:border-pink-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 p-3 bg-pink-50 rounded-xl text-pink-500">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Hygiene Kits</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access free hygiene kits and essential products through our confidential service
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm md:text-base text-gray-500 max-w-md mx-auto">
        I'm excited to chat with you! Just type your message below and let's start our conversation.
      </p>
    </div>
  );
};

export default WelcomeMessage;
