import React from 'react';
import { useUser } from '../../context/UserContext';
import { ExternalLink } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useUser();

  if (!user?.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Admin Panel Coming Soon</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The admin panel is currently under development. Check back later for updates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Please use the backend admin panel to manage your data and settings.
        </p>
        <a
          href="https://glt-chat-backend.izeeshan.dev/admin"
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