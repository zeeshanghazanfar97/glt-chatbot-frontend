import React, { useState } from 'react';
import { Book, Package, Trophy, Clock, X, ChevronRight, Medal, Star, Zap, Brain, Target, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const mockBadges = [
  {
    id: 1,
    title: 'Quick Learner',
    description: 'Complete 5 lessons in a single day',
    icon: <Zap size={24} />,
    progress: 100,
    earned: true,
    earnedDate: '2024-03-10',
    type: 'achievement'
  },
  {
    id: 2,
    title: 'Tech Explorer',
    description: 'Try all available learning modules',
    icon: <Brain size={24} />,
    progress: 60,
    earned: false,
    type: 'progress'
  },
  {
    id: 3,
    title: 'Perfect Score',
    description: 'Get 100% in any module quiz',
    icon: <Target size={24} />,
    progress: 100,
    earned: true,
    earnedDate: '2024-03-15',
    type: 'achievement'
  },
  {
    id: 4,
    title: 'Learning Streak',
    description: 'Study for 7 consecutive days',
    icon: <Flame size={24} />,
    progress: 85,
    earned: false,
    type: 'progress'
  }
];

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

const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-03-15',
    items: ['Hygiene Kit Basic', 'Personal Care Pack'],
    status: 'Delivered',
    total: 25.99
  },
  {
    id: 'ORD-002',
    date: '2024-03-10',
    items: ['Wellness Bundle'],
    status: 'In Transit',
    total: 35.50
  }
];

const mockAchievements = [
  { id: 1, title: 'First Course Completed', date: '2024-03-01', points: 100 },
  { id: 2, title: 'Perfect Quiz Score', date: '2024-03-05', points: 50 },
  { id: 3, title: 'Learning Streak - 7 Days', date: '2024-03-12', points: 75 },
];

const Dashboard: React.FC = () => {
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Book size={20} />}
          label="Active Courses"
          value="3"
          onClick={() => setSelectedModal('courses')}
        />
        <StatCard
          icon={<Trophy size={20} />}
          label="Achievements"
          value="12"
          onClick={() => setSelectedModal('achievements')}
        />
        <StatCard
          icon={<Package size={20} />}
          label="Total Orders"
          value="2"
          onClick={() => setSelectedModal('orders')}
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Learning Hours"
          value="24"
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
          {mockBadges.slice(0, 4).map(badge => (
            <motion.div
              key={badge.id}
              className={`p-4 rounded-xl text-center ${
                badge.earned 
                  ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white' 
                  : 'bg-pink-50 text-gray-800'
              }`}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                badge.earned ? 'bg-white/20' : 'bg-white'
              }`}>
                {badge.icon}
              </div>
              <h3 className="font-medium text-sm mb-1">{badge.title}</h3>
              {!badge.earned && badge.progress > 0 && (
                <div className="w-full bg-white rounded-full h-1 mt-2">
                  <div 
                    className="bg-pink-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${badge.progress}%` }}
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
            {mockOrders.map(order => (
              <motion.div 
                key={order.id}
                className="p-4 rounded-lg bg-pink-50/50 hover:bg-pink-50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{order.id}</h3>
                    <p className="text-sm text-gray-600">
                      {order.items.join(', ')}
                    </p>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full font-medium
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-pink-500">
                    ${order.total.toFixed(2)}
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
        isOpen={selectedModal === 'achievements'}
        onClose={() => setSelectedModal(null)}
        title="Your Achievements"
      >
        <div className="space-y-4">
          {mockAchievements.map(achievement => (
            <div key={achievement.id} className="flex items-center gap-4 p-4 bg-pink-50 rounded-lg">
              <div className="p-2 bg-white rounded-full text-pink-500">
                <Trophy size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                <p className="text-sm text-gray-600">
                  Earned on {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-pink-500 font-medium">
                {achievement.points} pts
              </div>
            </div>
          ))}
        </div>
      </DetailModal>

      <DetailModal
        isOpen={selectedModal === 'orders'}
        onClose={() => setSelectedModal(null)}
        title="Order History"
      >
        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-800">{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Ordered on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full font-medium
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 text-right">
                <span className="font-medium text-pink-500">
                  Total: ${order.total.toFixed(2)}
                </span>
              </div>
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
            <p className="text-3xl font-bold text-pink-500">24 Hours</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Time Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Introduction to Programming</span>
                <span className="font-medium text-gray-800">10 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Web Development Basics</span>
                <span className="font-medium text-gray-800">8 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Digital Safety</span>
                <span className="font-medium text-gray-800">6 hours</span>
              </div>
            </div>
          </div>
        </div>
      </DetailModal>

      {/* Badges Modal */}
      <DetailModal
        isOpen={selectedModal === 'badges'}
        onClose={() => setSelectedModal(null)}
        title="All Badges"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBadges.map(badge => (
              <motion.div
                key={badge.id}
                className={`p-4 rounded-xl ${
                  badge.earned 
                    ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white' 
                    : 'bg-pink-50 text-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    badge.earned ? 'bg-white/20' : 'bg-white'
                  }`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{badge.title}</h3>
                    <p className={`text-sm ${badge.earned ? 'text-white/80' : 'text-gray-600'}`}>
                      {badge.description}
                    </p>
                    {badge.earned ? (
                      <p className="text-sm mt-2 text-white/80">
                        Earned on {new Date(badge.earnedDate!).toLocaleDateString()}
                      </p>
                    ) : (
                      <div className="w-full bg-white rounded-full h-1.5 mt-3">
                        <div 
                          className="bg-pink-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${badge.progress}%` }}
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
    </div>
  );
};

export default Dashboard;
