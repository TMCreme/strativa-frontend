import { create } from 'zustand';
import { CompanyProfile } from '../../services/companyProfileService';
import companyProfileService from '../../services/companyProfileService';

interface CompanyProfileState {
  // Data
  companyProfile: CompanyProfile | null;
  
  // Loading states
  isLoading: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  fetchCompanyProfile: (companyId: number) => Promise<void>;
  fetchCompanyProfileById: (profileId: number) => Promise<void>;
  updateCompanyProfile: (profileId: number, data: Partial<CompanyProfile>) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useCompanyProfileStore = create<CompanyProfileState>((set, get) => ({
  // Initial state
  companyProfile: null,
  isLoading: false,
  error: null,

  // Actions
  fetchCompanyProfile: async (companyId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await companyProfileService.getCompanyProfile(companyId);
      set({
        companyProfile: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching company profile:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to load company profile. Please check your connection.' 
      });
    }
  },

  fetchCompanyProfileById: async (profileId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await companyProfileService.getCompanyProfileById(profileId);
      set({
        companyProfile: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching company profile by ID:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to load company profile. Please check your connection.' 
      });
    }
  },

  updateCompanyProfile: async (profileId: number, data: Partial<CompanyProfile>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await companyProfileService.updateCompanyProfile(profileId, data);
      set({
        companyProfile: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error updating company profile:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to update company profile. Please try again.' 
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      companyProfile: null,
      isLoading: false,
      error: null,
    });
  },
}));
