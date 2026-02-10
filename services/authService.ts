
import { UserProfile } from '../types';

// Use 127.0.0.1 instead of localhost to prevent IPv6 resolution issues on some systems
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_profile: UserProfile;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Authentication failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  },

  async register(username: string, password: string, email: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    });
    
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  }
};
