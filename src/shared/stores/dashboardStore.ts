import { create } from 'zustand';
import { Company } from '../services/companiesService';
import { DashboardStat, AIWatchlistItem } from '../services/dashboardService';
import companiesService from '../services/companiesService';
import dashboardService from '../services/dashboardService';

interface DashboardState {
  // Data
  companies: Company[];
  stats: DashboardStat[];
  aiWatchlist: AIWatchlistItem[];
  
  // Loading states
  isLoadingCompanies: boolean;
  isLoadingStats: boolean;
  isLoadingAIWatchlist: boolean;
  
  // Error states
  companiesError: string | null;
  statsError: string | null;
  aiWatchlistError: string | null;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  
  // Search and filters
  searchQuery: string;
  selectedSector: string;
  selectedStage: string;
  
  // Actions
  fetchCompanies: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sector?: string;
    stage?: string;
  }) => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAIWatchlist: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedSector: (sector: string) => void;
  setSelectedStage: (stage: string) => void;
  setCurrentPage: (page: number) => void;
  addCompany: (company: Omit<Company, 'id'>) => Promise<void>;
  updateCompany: (id: number, company: Partial<Company>) => Promise<void>;
  deleteCompany: (id: number) => Promise<void>;
  clearErrors: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  companies: [],
  stats: [],
  aiWatchlist: [],
  isLoadingCompanies: false,
  isLoadingStats: false,
  isLoadingAIWatchlist: false,
  companiesError: null,
  statsError: null,
  aiWatchlistError: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  searchQuery: '',
  selectedSector: '',
  selectedStage: '',

  // Actions
  fetchCompanies: async (params = {}) => {
    set({ isLoadingCompanies: true, companiesError: null });
    try {
      const response = await companiesService.getCompanies({
        page: get().currentPage,
        limit: get().itemsPerPage,
        search: get().searchQuery,
        sector: get().selectedSector,
        stage: get().selectedStage,
        ...params,
      });
      
      set({
        companies: response.data,
        totalItems: response.total,
        totalPages: Math.ceil(response.total / get().itemsPerPage),
        isLoadingCompanies: false,
        companiesError: null,
      });
    } catch (error) {
      console.error('Error fetching companies:', error);
      set({ 
        isLoadingCompanies: false, 
        companiesError: 'Failed to load companies. Please check your connection.' 
      });
    }
  },

  fetchStats: async () => {
    set({ isLoadingStats: true, statsError: null });
    try {
      const stats = await dashboardService.getDashboardStats();
      set({ stats, isLoadingStats: false, statsError: null });
    } catch (error) {
      console.error('Error fetching stats:', error);
      set({ 
        isLoadingStats: false, 
        statsError: 'Failed to load dashboard stats.' 
      });
    }
  },

  fetchAIWatchlist: async () => {
    set({ isLoadingAIWatchlist: true, aiWatchlistError: null });
    try {
      const aiWatchlist = await dashboardService.getAIWatchlist();
      set({ aiWatchlist, isLoadingAIWatchlist: false, aiWatchlistError: null });
    } catch (error) {
      console.error('Error fetching AI watchlist:', error);
      set({ 
        isLoadingAIWatchlist: false, 
        aiWatchlistError: 'Failed to load AI watchlist.' 
      });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query, currentPage: 1 });
    get().fetchCompanies();
  },

  setSelectedSector: (sector: string) => {
    set({ selectedSector: sector, currentPage: 1 });
    get().fetchCompanies();
  },

  setSelectedStage: (stage: string) => {
    set({ selectedStage: stage, currentPage: 1 });
    get().fetchCompanies();
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
    get().fetchCompanies();
  },

  addCompany: async (company: Omit<Company, 'id'>) => {
    try {
      await companiesService.createCompany(company);
      get().fetchCompanies();
    } catch (error) {
      console.error('Error adding company:', error);
      throw error;
    }
  },

  updateCompany: async (id: number, company: Partial<Company>) => {
    try {
      await companiesService.updateCompany(id, company);
      get().fetchCompanies();
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  deleteCompany: async (id: number) => {
    try {
      await companiesService.deleteCompany(id);
      get().fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  },

  clearErrors: () => {
    set({ 
      companiesError: null, 
      statsError: null, 
      aiWatchlistError: null 
    });
  },
}));
