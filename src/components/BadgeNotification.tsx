import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeType } from '../types';
import { Award, X } from 'lucide-react';

interface BadgeNotificationProps {
  badge: BadgeType;
  onClose: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, y: 50 }}
      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-pink-100">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
          
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="w-20 h-20 mx-auto mb-4"
            >
              <img 
                src={badge.badge_icon} 
                alt={badge.badge_name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                🎉 New Badge Earned!
              </h3>
              <h4 className="text-lg font-semibold text-pink-500 mb-2">
                {badge.badge_name}
              </h4>
              <p className="text-gray-600 text-sm">
                {badge.badge_description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BadgeNotification;