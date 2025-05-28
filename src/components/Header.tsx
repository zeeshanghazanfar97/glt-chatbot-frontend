import React from 'react';
import { Heart, Menu, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const showBackButton = ['/dashboard', '/admin'].includes(location.pathname);

  return (
    <header className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-4 md:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton ? (
            <button
              onClick={() => navigate('/app')}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <Menu size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <Heart className="text-white" size={24} fill="white" />
            <div>
              <h1 className="text-xl font-bold">Girlz Love Tech</h1>
              {user && <div className="text-sm text-white/80">Welcome, {user.name}</div>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;