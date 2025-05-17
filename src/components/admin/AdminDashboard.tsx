import React, { useState } from 'react';
import { 
  Users, BookOpen, ShoppingBag, TrendingUp, ChevronDown, 
  BarChart3, PieChart, Calendar, ArrowUpRight, ArrowDownRight,
  Download, Filter, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for analytics
const mockAnalytics = {
  totalUsers: 1250,
  activeUsers: 856,
  totalOrders: 450,
  revenue: 12500,
  userGrowth: 15.8,
  orderGrowth: -2.3,
  revenueGrowth: 23.5,
  activeCoursesGrowth: 8.9,
};

const mockUserData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [850, 940, 1020, 1150, 1200, 1250],
};

const mockOrderData = {
  labels: ['Hygiene Kits', 'Wellness Bundles', 'Care Packages', 'Educational Materials'],
  data: [35, 25, 20, 20],
};

const mockRecentUsers = [
  { id: 1, name: 'Sarah Johnson', grade: 9, school: 'Lincoln High School', joinDate: '2024-03-15' },
  { id: 2, name: 'Emily Chen', grade: 7, school: 'Washington Middle School', joinDate: '2024-03-14' },
  { id: 3, name: 'Maria Garcia', grade: 11, school: 'Roosevelt High School', joinDate: '2024-03-13' },
  { id: 4, name: 'Aisha Patel', grade: 8, school: 'Jefferson Middle School', joinDate: '2024-03-12' },
];

const mockRecentOrders = [
  { id: 'ORD-001', user: 'Sarah Johnson', items: ['Hygiene Kit Basic'], total: 25.99, status: 'Delivered' },
  { id: 'ORD-002', user: 'Emily Chen', items: ['Wellness Bundle'], total: 35.50, status: 'Processing' },
  { id: 'ORD-003', user: 'Maria Garcia', items: ['Care Package Plus'], total: 45.99, status: 'Shipped' },
];

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  growth?: number;
  prefix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, growth, prefix = '' }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
        {icon}
      </div>
      {growth !== undefined && (
        <div className={`flex items-center gap-1 text-sm font-medium ${
          growth >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {growth >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(growth)}%
        </div>
      )}
    </div>
    <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">
      {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
    </p>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage platform activities</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar size={16} />
              {dateRange}
              <ChevronDown size={16} />
            </button>
          </div>
          
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={mockAnalytics.totalUsers}
          icon={<Users size={20} />}
          growth={mockAnalytics.userGrowth}
        />
        <StatCard
          title="Active Users"
          value={mockAnalytics.activeUsers}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Total Orders"
          value={mockAnalytics.totalOrders}
          icon={<ShoppingBag size={20} />}
          growth={mockAnalytics.orderGrowth}
        />
        <StatCard
          title="Total Revenue"
          value={mockAnalytics.revenue}
          icon={<TrendingUp size={20} />}
          growth={mockAnalytics.revenueGrowth}
          prefix="$"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">User Growth</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {mockUserData.data.map((value, index) => (
              <div key={index} className="flex-1">
                <div 
                  className="bg-pink-100 rounded-t-lg hover:bg-pink-200 transition-colors"
                  style={{ height: `${(value / Math.max(...mockUserData.data)) * 100}%` }}
                />
                <p className="text-xs text-gray-600 text-center mt-2">{mockUserData.labels[index]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Order Distribution</h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={16} className="text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockOrderData.labels.map((label, index) => (
              <div key={index} className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
                />
                <div className="flex-grow">
                  <p className="text-sm text-gray-600">{label}</p>
                  <p className="text-lg font-semibold text-gray-800">{mockOrderData.data[index]}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Grade</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">School</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.grade}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.school}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            <button className="text-sm text-pink-500 hover:text-pink-600 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockRecentOrders.map((order) => (
              <div key={order.id} className="p-4 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-800">{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'Processing'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{order.user}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">{order.items.join(', ')}</p>
                  <p className="text-sm font-medium text-gray-800">${order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;