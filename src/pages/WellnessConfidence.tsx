import React from 'react';
import { Heart, Brain, Star, Shield, Target, Sparkles, ArrowRight, Leaf, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WellnessConfidence = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Self-Love & Acceptance",
      icon: <Heart className="w-6 h-6" />,
      content: [
        "Practice positive self-talk daily",
        "Celebrate your unique qualities",
        "Focus on your strengths and achievements",
        "Accept that nobody is perfect",
        "Treat yourself with the same kindness you show others"
      ]
    },
    {
      title: "Mental Wellness",
      icon: <Brain className="w-6 h-6" />,
      content: [
        "Develop healthy coping mechanisms",
        "Practice mindfulness and meditation",
        "Set realistic goals and expectations",
        "Take breaks when feeling overwhelmed",
        "Maintain a gratitude journal"
      ]
    },
    {
      title: "Building Confidence",
      icon: <Star className="w-6 h-6" />,
      content: [
        "Step out of your comfort zone gradually",
        "Learn from mistakes and setbacks",
        "Celebrate small victories",
        "Practice power poses",
        "Develop new skills and hobbies"
      ]
    },
    {
      title: "Emotional Intelligence",
      icon: <Shield className="w-6 h-6" />,
      content: [
        "Recognize and name your emotions",
        "Understand triggers and responses",
        "Practice active listening",
        "Show empathy towards others",
        "Communicate feelings effectively"
      ]
    },
    {
      title: "Goal Setting",
      icon: <Target className="w-6 h-6" />,
      content: [
        "Set SMART goals for yourself",
        "Break big goals into smaller steps",
        "Track your progress regularly",
        "Adjust goals as needed",
        "Celebrate achievements along the way"
      ]
    }
  ];

  const dailyAffirmations = [
    "I am capable of amazing things",
    "My voice matters",
    "I choose to be confident",
    "I am worthy of respect and love",
    "I trust in my abilities",
    "My potential is limitless"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/app')}
            className="p-2 hover:bg-pink-50 rounded-full transition-colors text-pink-500 hover:text-pink-600"
            aria-label="Back to chat"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Wellness & Confidence Guide</h1>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl shadow-lg text-white mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Build Your Confidence</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover powerful strategies for building self-confidence, maintaining emotional wellness, 
            and becoming the best version of yourself. Remember, confidence is a skill that grows with practice!
          </p>
        </div>

        {/* Daily Affirmations */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl p-8 mb-12 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Daily Affirmations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyAffirmations.map((affirmation, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300"
              >
                <p className="text-lg font-medium">{affirmation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-pink-100"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-xl text-pink-500">
                  {section.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <Leaf className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our AI assistant is here to provide personalized guidance and support on your path to 
            greater confidence and wellness. Let's work together to help you shine!
          </p>
          <button 
            onClick={() => navigate('/app')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl 
              hover:from-pink-500 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Chat with GLT Assistant
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessConfidence;