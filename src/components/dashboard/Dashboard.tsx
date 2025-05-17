import React from 'react';
import { Book, Package, Trophy, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-sm border border-pink-100"
          whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
              <Book size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-4 rounded-xl shadow-sm border border-pink-100"
          whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-4 rounded-xl shadow-sm border border-pink-100"
          whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xl font-bold text-gray-800">2</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-4 rounded-xl shadow-sm border border-pink-100"
          whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Learning Hours</p>
              <p className="text-xl font-bold text-gray-800">24</p>
            </div>
          </div>
        </motion.div>
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
    </div>
  );
};

export default Dashboard;