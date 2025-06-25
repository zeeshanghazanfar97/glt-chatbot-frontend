import axios from 'axios';

const API_BASE_URL = 'https://glt-backend.glt-sandbox.com';

export type UserType = 'student' | 'teacher' | 'parent' | 'community_member' | 'sponsor';

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  user_type: UserType;
  student_grade?: number;
  student_school?: string;
  student_name?: string;
  organization_name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

const authService = {
  async register(data: RegisterData) {
    try {
      // Remove undefined fields to keep payload clean
      const payload = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
      
      const response = await axios.post(`${API_BASE_URL}/api/auth/register/`, payload);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  async login(data: LoginData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, data);
      const tokens: AuthTokens = response.data;
      localStorage.setItem('tokens', JSON.stringify(tokens));
      return tokens;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  async logout() {
    try {
      const tokens = this.getTokens();
      if (tokens?.refresh) {
        await axios.post(`${API_BASE_URL}/api/auth/token/blacklist/`, {
          refresh: tokens.refresh
        });
      }
      localStorage.removeItem('tokens');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  },

  async refreshToken() {
    try {
      const tokens = this.getTokens();
      if (!tokens?.refresh) return null;

      const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
        refresh: tokens.refresh
      });
      
      const newTokens: AuthTokens = {
        ...tokens,
        access: response.data.access
      };
      
      localStorage.setItem('tokens', JSON.stringify(newTokens));
      return newTokens;
    } catch (error) {
      localStorage.removeItem('tokens');
      return null;
    }
  },

  async requestPasswordReset(email: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/password_reset/`, { email });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  async confirmPasswordReset(token: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/password_reset/confirm/`, {
        token,
        password
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },

  getTokens(): AuthTokens | null {
    const tokensStr = localStorage.getItem('tokens');
    return tokensStr ? JSON.parse(tokensStr) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getTokens()?.access;
  }
};

export default authService;
