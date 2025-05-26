import React, { createContext, useContext, useState, useEffect } from 'react';
import authService, { AuthTokens, LoginData, RegisterData } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const refreshTokens = async () => {
      const tokens = await authService.refreshToken();
      setIsAuthenticated(!!tokens);
    };

    refreshTokens();
    const interval = setInterval(refreshTokens, 4 * 60 * 1000); // Refresh every 4 minutes

    return () => clearInterval(interval);
  }, []);

  const login = async (data: LoginData) => {
    try {
      await authService.login(data);
      setIsAuthenticated(true);
      setError(null);
    } catch (err: any) {
      setError(err.detail || 'Login failed');
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authService.register(data);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.email?.[0] || 'Registration failed';
      setError(errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
