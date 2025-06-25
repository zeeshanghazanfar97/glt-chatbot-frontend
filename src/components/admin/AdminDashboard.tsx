import React from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Users, Package, Trophy, Clock, X, ChevronRight, Medal, Star, Zap, Brain, Target, Flame, ArrowLeft } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  if (!user?.is_admin) {
    return (
      <div className="relative min-h-screen p-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/app')}
            className="p-2 hover:bg-pink-50 rounded-full transition-colors text-pink-500 hover:text-pink-600"
            aria-label="Back to chat"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        {/* Blurred Preview */}
        <div className="filter blur-sm pointer-events-none">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-pink-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
                    <Users size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-xl font-bold text-gray-800">1,234</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-pink-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
                    <Package size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-xl font-bold text-gray-800">856</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-pink-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
                    <Trophy size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">Active Courses</p>
                    <p className="text-xl font-bold text-gray-800">12</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm border border-pink-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
                    <Clock size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">Total Hours</p>
                    <p className="text-xl font-bold text-gray-800">2,450</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Users</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-pink-50/50">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-pink-50/50">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="text-center p-8 rounded-2xl bg-white shadow-xl border border-pink-100 max-w-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Panel Coming Soon</h2>
            <p className="text-gray-600 mb-8">
              We're working hard to bring you a powerful admin dashboard. In the meantime, 
              administrators can manage data through our backend panel.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-gray-500">
              <span>Available at:</span>
              <a
                href="https://glt-backend.glt-sandbox.com/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 font-medium flex items-center gap-1"
              >
                api.girlzlovetech.org/admin
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header with Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate('/app')}
          className="p-2 hover:bg-white/20 rounded-full transition-colors text-pink-500 hover:text-pink-600"
          aria-label="Back to chat"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Please use the backend admin panel to manage your data and settings.
        </p>
        <a
          href="https://api.girlzlovetech.org/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Open Admin Panel
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;