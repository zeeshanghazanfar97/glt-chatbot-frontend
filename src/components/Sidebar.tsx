import React from 'react';
import { MessageSquare, Package, ShoppingBag, Heart, Smile, ChevronRight, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const menuItems = [
  {
    id: 'dashboard',
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    id: 'admin',
    icon: <Settings size={20} />,
    label: 'Admin Panel',
    path: '/admin',
  },
  {
    id: 'hygiene',
    icon: <MessageSquare size={20} />,
    label: 'Hygiene Tips',
    path: '/',
  },
  {
    id: 'kit',
    icon: <Package size={20} />,
    label: 'Free Kit Info',
    path: '/',
  },
  {
    id: 'products',
    icon: <ShoppingBag size={20} />,
    label: 'Add-On Products',
    path: '/',
  },
  {
    id: 'puberty',
    icon: <Heart size={20} />,
    label: 'Learn About Puberty',
    path: '/',
  },
  {
    id: 'wellness',
    icon: <Smile size={20} />,
    label: 'Wellness & Confidence',
    path: '/',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onToggle }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Toggle button for desktop */}
      <motion.button
        className="fixed top-24 left-0 hidden lg:flex items-center justify-center w-6 h-12 
          bg-white rounded-r-lg shadow-md text-pink-500 hover:text-pink-600 z-30"
        onClick={onToggle}
        initial={false}
        animate={{ 
          left: isOpen ? '256px' : '0px',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <ChevronRight 
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </motion.button>
      
      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-full bg-white shadow-lg z-30 overflow-hidden"
        initial={false}
        animate={{ 
          width: isOpen ? '256px' : '0px',
          boxShadow: isOpen ? 'lg' : 'none',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-64 h-full flex flex-col">
          <div className="flex-grow py-6 overflow-y-auto">
            <div className="px-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <p className="text-sm text-gray-500">Quick access to features</p>
            </div>
            
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 
                    rounded-lg transition-colors duration-200 group"
                >
                  <span className="text-pink-500 group-hover:text-pink-600 transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium group-hover:text-pink-600 transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-100">
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-pink-50 
                rounded-lg transition-colors duration-200 group"
            >
              <span className="text-pink-500 group-hover:text-pink-600 transition-colors">
                <LogOut size={20} />
              </span>
              <span className="text-sm font-medium group-hover:text-pink-600 transition-colors">
                Logout
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;