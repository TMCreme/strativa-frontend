import { apiClient, ApiResponse } from './client';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Auth API Service
export const authApi = {
  // Login
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  // Register
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  // Logout
  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/logout');
  },

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/auth/me');
  },

  // Refresh token
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return apiClient.post<{ token: string }>('/auth/refresh');
  },

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/forgot-password', { email });
  },

  // Reset password
  async resetPassword(token: string, password: string): Promise<ApiResponse<void>> {
    return apiClient.post<void>('/auth/reset-password', { token, password });
  },
};
