import { apiClient } from './apiClient';
import { User } from '../contexts/AuthContext';

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: User['role'];
}

// Mock data for development
const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    walletBalance: 150.50,
    verified: true,
    profile: {
      bio: 'Tech enthusiast and gadget lover',
      phone: '+1234567890',
      address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001'
      }
    }
  },
  {
    id: 'vendor_1',
    name: 'Sarah Wilson',
    email: 'sarah@techstore.com',
    role: 'vendor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b739?w=150&h=150&fit=crop&crop=faces',
    walletBalance: 2450.75,
    verified: true,
    profile: {
      bio: 'Electronics vendor with 5+ years experience',
      phone: '+1987654321'
    }
  },
  {
    id: 'affiliate_1',
    name: 'Mike Johnson',
    email: 'mike@affiliate.com',
    role: 'affiliate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    walletBalance: 850.25,
    verified: true,
    profile: {
      bio: 'Digital marketing specialist and affiliate marketer',
      phone: '+1555123456'
    }
  },
  {
    id: 'influencer_1',
    name: 'Emma Davis',
    email: 'emma@influencer.com',
    role: 'influencer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    walletBalance: 1250.00,
    verified: true,
    profile: {
      bio: 'Content creator with 125K+ followers across platforms',
      phone: '+1555987654'
    }
  },
  {
    id: 'admin_1',
    name: 'Alex Rodriguez',
    email: 'admin@ecommerce.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces',
    walletBalance: 0,
    verified: true,
    profile: {
      bio: 'Platform administrator and system manager',
      phone: '+1555000000'
    }
  }
];

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // For development, use mock data
      const user = mockUsers.find(u => u.email === email);
      if (!user || password !== 'password123') {
        throw new Error('Invalid credentials');
      }
      
      return {
        user,
        token: 'mock_jwt_token_' + user.id
      };
      
      // Uncomment for real API
      // const response = await apiClient.post('/auth/login', { email, password });
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      // For development, create mock user
      const newUser: User = {
        id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        walletBalance: 0,
        verified: false,
        profile: {}
      };

      return {
        user: newUser,
        token: 'mock_jwt_token_' + newUser.id
      };

      // Uncomment for real API
      // const response = await apiClient.post('/auth/register', userData);
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      // For development, return mock user based on token
      const token = localStorage.getItem('auth_token');
      const userId = token?.split('_').pop();
      const user = mockUsers.find(u => u.id === userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;

      // Uncomment for real API
      // const response = await apiClient.get('/auth/me');
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to get user');
    }
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      // For development, return updated mock user
      const token = localStorage.getItem('auth_token');
      const userId = token?.split('_').pop();
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      
      mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
      return mockUsers[userIndex];

      // Uncomment for real API
      // const response = await apiClient.put('/settings/profile', data);
      // return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update profile');
    }
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      // For development, just log
      console.log('Password reset requested for:', email);

      // Uncomment for real API
      // await apiClient.post('/auth/forgot-password', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to send reset email');
    }
  }
};