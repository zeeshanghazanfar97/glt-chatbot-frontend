import axios from 'axios';
import { ResponseType } from '../types';
import authService from './authService';

const API_BASE_URL = 'https://glt-chat-backend.izeeshan.dev';

export const sendChatMessage = async (message: string): Promise<ResponseType> => {
  try {
    const tokens = authService.getTokens();
    if (!tokens?.access) throw new Error('Not authenticated');

    const response = await axios.post(
      `${API_BASE_URL}/api/chatbot/message/`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );

    return {
      text: response.data.response,
      products: response.data.products,
      suggestions: response.data.suggestions,
    };
  } catch (error: any) {
    console.error('Chat API Error:', error);
    throw error;
  }
};