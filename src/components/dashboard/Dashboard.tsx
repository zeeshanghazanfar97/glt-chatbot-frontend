import React, { useState, useEffect } from 'react';
import { Book, Package, Trophy, Clock, X, ChevronRight, Medal, Star, Zap, Brain, Target, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  onClick: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, onClick }) => (
  <motion.div 
    className="bg-white p-4 rounded-xl shadow-sm border border-pink-100 cursor-pointer"
    whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
        {icon}
      </div>
      <div className="flex-grow">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </div>
  </motion.div>
);

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Mock data for courses since it's not included in the API response
const mockLearningModules = [
  {
    id: 1,
    title: 'Introduction to Programming',
    progress: 75,
    totalLessons: 10,
    completedLessons: 7,
    lastAccessed: '2024-03-15'
  },
  {
    id: 2,
    title: 'Web Development Basics',
    progress: 40,
    totalLessons: 8,
    completedLessons: 3,
    lastAccessed: '2024-03-14'
  },
  {
    id: 3,
    title: 'Digital Safety',
    progress: 100,
    totalLessons: 5,
    completedLessons: 5,
    lastAccessed: '2024-03-10'
  }
];

const Dashboard: React.FC = () => {
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const { dashboardData, refreshDashboard } = useUser();

  useEffect(() => {
    refreshDashboard();
  }, []);

  if (!dashboardData) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { total_orders, orders, learning_hours, badges } = dashboardData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Book size={20} />}
          label="Active Courses"
          value={mockLearningModules.length}
          onClick={() => setSelectedModal('courses')}
        />
        <StatCard
          icon={<Trophy size={20} />}
          label="Earned Badges"
          value={badges.filter(b => b.is_earned).length}
          onClick={() => setSelectedModal('badges')}
        />
        <StatCard
          icon={<Package size={20} />}
          label="Total Orders"
          value={total_orders}
          onClick={() => setSelectedModal('orders')}
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Learning Hours"
          value={learning_hours.total_hours}
          onClick={() => setSelectedModal('hours')}
        />
      </div>

      {/* Badges Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">My Badges</h2>
          <button 
            onClick={() => setSelectedModal('badges')}
            className="text-sm text-pink-500 hover:text-pink-600 font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.slice(0, 4).map(badge => (
            <motion.div
              key={badge.badge_name}
              className={`p-4 rounded-xl text-center ${
                badge.is_earned 
                  ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white' 
                  : 'bg-pink-50 text-gray-800'
              }`}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                badge.is_earned ? 'bg-white/20' : 'bg-white'
              }`}>
                <img src={badge.badge_icon} alt={badge.badge_name} className="w-8 h-8" />
              </div>
              <h3 className="font-medium text-sm mb-1">{badge.badge_name}</h3>
              {!badge.is_earned && (
                <div className="w-full bg-white rounded-full h-1 mt-2">
                  <div 
                    className="bg-pink-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: '0%' }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Modules */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Modules</h2>
          <div className="space-y-4">
            {mockLearningModules.map(module => (
              <motion.div 
                key={module.id}
                className="p-4 rounded-lg bg-pink-50/50 hover:bg-pink-50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800">{module.title}</h3>
                  <span className="text-sm text-pink-500 font-medium">
                    {module.completedLessons}/{module.totalLessons} Lessons
                  </span>
                </div>
                <div className="w-full bg-pink-100 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Last accessed: {new Date(module.lastAccessed).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <motion.div 
                key={order.order_id}
                className="p-4 rounded-lg bg-pink-50/50 hover:bg-pink-50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{order.order_id}</h3>
                    <p className="text-sm text-gray-600">
                      {order.title}
                    </p>
                  </div>
                  <span className="text-sm px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                    {order.status}
                  </span>
                </div>
                {order.items && (
                  <ul className="mt-2 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600">• {item}</li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <DetailModal
        isOpen={selectedModal === 'courses'}
        onClose={() => setSelectedModal(null)}
        title="Active Courses"
      >
        <div className="space-y-4">
          {mockLearningModules.map(module => (
            <div key={module.id} className="border-b border-gray-100 pb-4">
              <h3 className="font-medium text-gray-800 mb-2">{module.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress: {module.progress}%</span>
                <span>{module.completedLessons}/{module.totalLessons} Lessons</span>
              </div>
              <div className="w-full bg-pink-100 rounded-full h-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </DetailModal>

      <DetailModal
        isOpen={selectedModal === 'badges'}
        onClose={() => setSelectedModal(null)}
        title="All Badges"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map(badge => (
              <motion.div
                key={badge.badge_name}
                className={`p-4 rounded-xl ${
                  badge.is_earned 
                    ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white' 
                    : 'bg-pink-50 text-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    badge.is_earned ? 'bg-white/20' : 'bg-white'
                  }`}>
                    <img src={badge.badge_icon} alt={badge.badge_name} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{badge.badge_name}</h3>
                    <p className={`text-sm ${badge.is_earned ? 'text-white/80' : 'text-gray-600'}`}>
                      {badge.badge_description}
                    </p>
                    {badge.is_earned ? (
                      <p className="text-sm mt-2 text-white/80">
                        Earned on {new Date(badge.earned_at!).toLocaleDateString()}
                      </p>
                    ) : (
                      <div className="w-full bg-white rounded-full h-1.5 mt-3">
                        <div 
                          className="bg-pink-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: '0%' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </DetailModal>

      <DetailModal
        isOpen={selectedModal === 'orders'}
        onClose={() => setSelectedModal(null)}
        title="Order History"
      >
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.order_id} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-800">{order.order_id}</h3>
                  <p className="text-sm text-gray-600">
                    Ordered on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                  {order.status}
                </span>
              </div>
              {order.items && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </DetailModal>

      <DetailModal
        isOpen={selectedModal === 'hours'}
        onClose={() => setSelectedModal(null)}
        title="Learning Hours"
      >
        <div className="space-y-4">
          <div className="bg-pink-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">Total Learning Time</h3>
            <p className="text-3xl font-bold text-pink-500">{learning_hours.total_hours} Hours</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Time Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(learning_hours.details).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600">{key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                  <span className="font-medium text-gray-800">{value} hours</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DetailModal>
    </div>
  );
};

export default Dashboard;