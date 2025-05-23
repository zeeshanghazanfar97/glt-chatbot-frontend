import React, { useState } from 'react';
import { Heart, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-pink-400 to-pink-400 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/20 rounded-full transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="text-white" size={24} fill="white" />
            <h1 className="text-xl font-bold">Girlz Love Tech</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-xs bg-white/20 rounded-full px-3 py-1">
            Your Personal Guide
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
      <p className="text-xs mt-2 text-pink-100 hidden md:block">
        Ask me about wellness, tech, or future careers!
      </p>
    </header>
  );
}