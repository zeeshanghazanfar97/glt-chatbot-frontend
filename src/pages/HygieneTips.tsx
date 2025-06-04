import React from 'react';
import { Heart, Droplet, Sun, Moon, Smile, ShowerHead, Sparkles, Leaf } from 'lucide-react';

const HygieneTips = () => {
  const categories = [
    {
      title: "Daily Hygiene Essentials",
      icon: <Heart className="w-6 h-6" />,
      tips: [
        "Brush teeth twice daily for 2 minutes",
        "Use fluoride toothpaste and floss daily",
        "Shower or bathe daily with mild soap",
        "Wash hands frequently with soap and water",
        "Change into clean clothes daily"
      ]
    },
    {
      title: "Personal Care",
      icon: <Droplet className="w-6 h-6" />,
      tips: [
        "Use deodorant after bathing",
        "Keep nails clean and trimmed",
        "Wash face twice daily",
        "Use gentle skincare products",
        "Stay hydrated throughout the day"
      ]
    },
    {
      title: "Morning Routine",
      icon: <Sun className="w-6 h-6" />,
      tips: [
        "Wash face with gentle cleanser",
        "Apply moisturizer and sunscreen",
        "Brush teeth and use mouthwash",
        "Style hair and ensure it's clean",
        "Put on clean, fresh clothes"
      ]
    },
    {
      title: "Evening Routine",
      icon: <Moon className="w-6 h-6" />,
      tips: [
        "Remove makeup completely",
        "Wash face before bed",
        "Change into clean sleepwear",
        "Brush teeth and floss",
        "Set out clean clothes for tomorrow"
      ]
    },
    {
      title: "Mental Wellness",
      icon: <Smile className="w-6 h-6" />,
      tips: [
        "Practice positive self-talk",
        "Maintain a consistent sleep schedule",
        "Take time for self-care activities",
        "Stay connected with friends and family",
        "Engage in activities you enjoy"
      ]
    },
    {
      title: "Shower Tips",
      icon: <ShowerHead className="w-6 h-6" />,
      tips: [
        "Use warm (not hot) water",
        "Wash from top to bottom",
        "Pay attention to often forgotten areas",
        "Use clean towels and washcloths",
        "Moisturize while skin is still damp"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl shadow-lg text-white mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Hygiene & Wellness Tips</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover essential tips and practices for maintaining good personal hygiene and overall wellness. 
            Remember, taking care of yourself is an important part of staying healthy and confident!
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-pink-100"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-xl text-pink-500">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <Leaf className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 shadow-sm border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-6">
            Our AI assistant is available 24/7 to answer your questions about hygiene, wellness, 
            and personal care. Feel free to ask anything - we're here to help you stay healthy and confident!
          </p>
          <button 
            onClick={() => window.location.href = '/app'}
            className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl 
              hover:from-pink-500 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Chat with GLT Assistant
          </button>
        </div>
      </div>
    </div>
  );
};

export default HygieneTips;