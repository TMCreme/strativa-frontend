import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
export interface AppState {
  // UI State
  isLoading: boolean;
  theme: 'light' | 'dark';
  
  // User State
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    isAuthenticated: boolean;
  };
  
  // Actions
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: Partial<AppState['user']>) => void;
  logout: () => void;
}

// Initial State
const initialState = {
  isLoading: false,
  theme: 'light' as const,
  user: {
    id: null,
    name: null,
    email: null,
    isAuthenticated: false,
  },
};

// Create Store
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Actions
        setLoading: (loading) => set({ isLoading: loading }),
        
        setTheme: (theme) => set({ theme }),
        
        setUser: (userData) => 
          set((state) => ({
            user: { ...state.user, ...userData }
          })),
        
        logout: () => 
          set((state) => ({
            user: initialState.user
          })),
      }),
      {
        name: 'strativa-store',
        partialize: (state) => ({
          theme: state.theme,
          user: state.user,
        }),
      }
    ),
    {
      name: 'strativa-store',
    }
  )
);
