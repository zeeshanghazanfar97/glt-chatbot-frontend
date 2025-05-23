import React from 'react';
import { Heart, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-4 md:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="text-white" size={24} fill="white" />
            <h1 className="text-xl font-bold">Girlz Love Tech</h1>
          </div>
        </div>
      </div>
    </header>
  );
};