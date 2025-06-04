import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ChatInterface from './components/ChatInterface';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RequestPasswordReset from './components/auth/RequestPasswordReset';
import ResetPassword from './components/auth/ResetPassword';
import Sidebar from './components/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LearnMore from './pages/LearnMore';
import HygieneTips from './pages/HygieneTips';
import WellnessConfidence from './pages/WellnessConfidence';
import Products from './pages/Products';

const AnimatedRoutes = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request-reset" element={<RequestPasswordReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/hygiene-tips" element={<HygieneTips />} />
        <Route path="/wellness-confidence" element={<WellnessConfidence />} />
        <Route path="/products" element={<Products />} />
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              <div className="min-h-[100dvh] bg-gradient-to-b from-pink-50 to-white flex">
                <Sidebar 
                  isOpen={isSidebarOpen} 
                  onClose={() => setIsSidebarOpen(false)}
                  onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
                  <ChatInterface onMenuClick={() => setIsSidebarOpen(true)} />
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div className="min-h-[100dvh] bg-gradient-to-b from-pink-50 to-white flex">
                <Sidebar 
                  isOpen={isSidebarOpen} 
                  onClose={() => setIsSidebarOpen(false)}
                  onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <div className="min-h-[100dvh] bg-gradient-to-b from-pink-50 to-white flex">
                <Sidebar 
                  isOpen={isSidebarOpen} 
                  onClose={() => setIsSidebarOpen(false)}
                  onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
                  <AdminDashboard />
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      try {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').catch(error => {
            console.debug('Service worker registration skipped:', error.message);
          });
        });
      } catch (error) {
        console.debug('Service worker setup skipped:', error.message);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>
            <ChatProvider>
              <AnimatedRoutes />
            </ChatProvider>
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;