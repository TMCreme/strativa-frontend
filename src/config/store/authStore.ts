import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authApi, LoginCredentials, RegisterData, User } from '@/shared/api';

// Types
export interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Initial State
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Create Auth Store
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Actions
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authApi.login(credentials);
            
            if (response.success) {
              set({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            }
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.message || 'Login failed',
            });
            throw error;
          }
        },
        
        register: async (data: RegisterData) => {
          set({ isLoading: true, error: null });
          
          try {
            const response = await authApi.register(data);
            
            if (response.success) {
              set({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            }
          } catch (error: any) {
            set({
              isLoading: false,
              error: error.message || 'Registration failed',
            });
            throw error;
          }
        },
        
        logout: async () => {
          set({ isLoading: true });
          
          try {
            await authApi.logout();
          } catch (error) {
            // Continue with logout even if API call fails
            console.error('Logout API error:', error);
          }
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        },
        
        getCurrentUser: async () => {
          const { token } = get();
          
          if (!token) {
            set({ isAuthenticated: false });
            return;
          }
          
          set({ isLoading: true });
          
          try {
            const response = await authApi.getCurrentUser();
            
            if (response.success) {
              set({
                user: response.data,
                isAuthenticated: true,
                isLoading: false,
              });
            }
          } catch (error: any) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: error.message,
            });
          }
        },
        
        clearError: () => set({ error: null }),
        
        setLoading: (loading: boolean) => set({ isLoading: loading }),
      }),
      {
        name: 'strativa-auth-store',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'strativa-auth-store',
    }
  )
);
