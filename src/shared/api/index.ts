// Export API client
export { apiClient } from './client';
export type { ApiResponse, ApiError } from './client';

// Export Auth API
export { authApi } from './auth';
export type { 
  LoginCredentials, 
  RegisterData, 
  User, 
  AuthResponse 
} from './auth';
