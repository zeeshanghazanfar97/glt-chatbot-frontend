import axios from 'axios';
import { UserType, DashboardDataType } from '../types';
import authService from './authService';

const API_BASE_URL = 'https://api.girlzlovetech.org';

const userService = {
  async getUserInfo(): Promise<UserType> {
    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const response = await axios.get(`${API_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('User API Error:', error);
      throw error;
    }
  },

  async getDashboardData(): Promise<DashboardDataType> {
    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const response = await axios.get(`${API_BASE_URL}/api/user/dashboard`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Dashboard API Error:', error);
      throw error;
    }
  },
};

export default userService;
