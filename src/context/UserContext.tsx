import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserType, DashboardDataType } from '../types';
import userService from '../services/userService';

interface UserContextType {
  user: UserType | null;
  dashboardData: DashboardDataType | null;
  loading: boolean;
  error: string | null;
  refreshDashboard: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  dashboardData: null,
  loading: true,
  error: null,
  refreshDashboard: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserData = async () => {
    try {
      const userData = await userService.getUserInfo();
      setUser(userData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load user data');
    }
  };

  const refreshDashboard = async () => {
    try {
      const data = await userService.getDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // Only load user data for now, since dashboard endpoint is not available
        await loadUserData();
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <UserContext.Provider value={{ user, dashboardData, loading, error, refreshDashboard }}>
      {children}
    </UserContext.Provider>
  );
};