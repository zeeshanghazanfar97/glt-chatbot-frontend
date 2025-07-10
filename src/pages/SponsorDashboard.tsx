import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Users, Target, TrendingUp, Calendar, Gift, Heart, Star, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SponsorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const upcomingFeatures = [
    {
      title: "Sponsorship Analytics",
      description: "Track the impact of your sponsorships with detailed analytics and reporting",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Student Progress Tracking",
      description: "Monitor the progress of students you're sponsoring in real-time",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Impact Measurement",
      description: "See how your contributions are making a difference in young women's lives",
      icon: <Target className="w-8 h-8" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Event Management",
      description: "Organize and manage sponsorship events and workshops",
      icon: <Calendar className="w-8 h-8" />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Donation Management",
      description: "Manage your donations and see where your funds are being allocated",
      icon: <Gift className="w-8 h-8" />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Recognition Program",
      description: "Participate in our sponsor recognition and awards program",
      icon: <Star className="w-8 h-8" />,
      color: "from-yellow-500 to-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/app')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-blue-600 hover:text-blue-700"
            aria-label="Back to chat"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sponsor Dashboard</h1>
            <p className="text-gray-600">Manage your sponsorships and track impact</p>
          </div>
        </div>

        {/* Coming Soon Hero Section */}
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 text-white shadow-xl cursor-pointer"
            onClick={() => navigate('/sponsor/hygiene-kits')}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
              <ArrowRight className="w-6 h-6 text-white/80" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Sponsor Hygiene Kits</h3>
            <p className="text-white/90 mb-4">
              Provide essential hygiene supplies to students in need. Choose schools, 
              select kit types, and make an immediate impact.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl text-sm font-semibold">
              <Gift className="w-4 h-4" />
              Available Now
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Full Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive sponsorship management, analytics, and impact tracking 
              tools are coming soon.
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
              <Calendar className="w-4 h-4" />
              Coming Soon
            </div>
          </motion.div>
        </div>

        {/* Upcoming Features Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Coming</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg mb-4`}>
                  {feature.icon}
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl px-8 py-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Want to Learn More?</h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            We're excited to work with sponsors who share our vision of empowering young women through 
            technology and education. Get in touch to learn about sponsorship opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sponsors@girlzlovetech.com"
              className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Contact Sponsorship Team
            </a>
            <button
              onClick={() => navigate('/app')}
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Back to Chat
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorDashboard;