import { DateString, UUID, Currency, Status, PaginationState, QueryParams } from './common.types';
import { Document, DocumentType, DocumentStatus, DocumentCategory } from './document.types';

// Company types
export interface Company {
  id: UUID;
  name: string;
  logo?: string;
  industry: string;
  sector: string;
  description: string;
  website?: string;
  founded: DateString;
  employees: number;
  location: string;
  valuation: number;
  currency: Currency;
  growth: number;
  status: Status;
  tags: string[];
  createdAt: DateString;
  updatedAt: DateString;
}

// Company Profile types
export interface CompanyProfile {
  id: UUID;
  companyId: UUID;
  name: string;
  description: string;
  industry: string;
  sector: string;
  valuation: number;
  currency: Currency;
  growth: number;
  team: TeamMember[];
  documents: Document[];
  growthData: GrowthDataPoint[];
  financials: FinancialData;
  metrics: CompanyMetrics;
  socialMedia: SocialMediaLinks;
  contact: ContactInfo;
  createdAt: DateString;
  updatedAt: DateString;
}

export interface TeamMember {
  id: UUID;
  name: string;
  position: string;
  avatar?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
  joinedAt: DateString;
}

export interface GrowthDataPoint {
  month: string;
  value: number;
  growth: number;
  revenue: number;
  users: number;
}

export interface FinancialData {
  revenue: number;
  profit: number;
  cashFlow: number;
  burnRate: number;
  runway: number;
  fundingRaised: number;
  lastFundingRound: FundingRound;
  financialYear: number;
}

export interface FundingRound {
  round: string;
  amount: number;
  date: DateString;
  investors: string[];
  valuation: number;
}

export interface CompanyMetrics {
  customerCount: number;
  userGrowth: number;
  retentionRate: number;
  churnRate: number;
  ltv: number; // Lifetime Value
  cac: number; // Customer Acquisition Cost
  arpu: number; // Average Revenue Per User
  mrr: number; // Monthly Recurring Revenue
}

export interface SocialMediaLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

// Dashboard Stats types
export interface DashboardStats {
  totalCompanies: number;
  totalInvestments: number;
  averageGrowth: number;
  activeDeals: number;
  portfolioValue: number;
  totalReturns: number;
  recentActivity: ActivityItem[];
  topPerformers: Company[];
  marketTrends: MarketTrend[];
}

export interface ActivityItem {
  id: UUID;
  type: ActivityType;
  company: string;
  companyId: UUID;
  amount?: number;
  currency: Currency;
  date: DateString;
  description: string;
  status: Status;
}

export type ActivityType = 
  | 'investment'
  | 'divestment'
  | 'valuation_update'
  | 'funding_round'
  | 'acquisition'
  | 'ipo'
  | 'document_upload'
  | 'meeting_scheduled'
  | 'due_diligence';

export interface MarketTrend {
  period: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
}

// AI Watchlist types
export interface AIWatchlistItem {
  id: UUID;
  company: Company;
  score: number;
  recommendation: RecommendationType;
  reason: string;
  confidence: number;
  factors: WatchlistFactor[];
  lastUpdated: DateString;
}

export type RecommendationType = 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';

export interface WatchlistFactor {
  factor: string;
  weight: number;
  score: number;
  description: string;
}

// Investment types
export interface Investment {
  id: UUID;
  companyId: UUID;
  company: Company;
  amount: number;
  currency: Currency;
  type: InvestmentType;
  date: DateString;
  status: InvestmentStatus;
  returns: number;
  exitDate?: DateString;
  notes?: string;
}

export type InvestmentType = 'equity' | 'debt' | 'convertible_note' | 'safe' | 'other';
export type InvestmentStatus = 'active' | 'exited' | 'written_off' | 'pending';

// Deal types
export interface Deal {
  id: UUID;
  companyId: UUID;
  company: Company;
  type: DealType;
  stage: DealStage;
  value: number;
  currency: Currency;
  probability: number;
  expectedCloseDate: DateString;
  assignedTo: UUID;
  notes?: string;
  documents: Document[];
  activities: DealActivity[];
  createdAt: DateString;
  updatedAt: DateString;
}

export type DealType = 'investment' | 'acquisition' | 'partnership' | 'licensing' | 'other';
export type DealStage = 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export interface DealActivity {
  id: UUID;
  type: DealActivityType;
  description: string;
  date: DateString;
  assignedTo: UUID;
  completed: boolean;
}

export type DealActivityType = 
  | 'meeting'
  | 'call'
  | 'email'
  | 'document_review'
  | 'due_diligence'
  | 'negotiation'
  | 'closing';

// Portfolio types
export interface Portfolio {
  id: UUID;
  name: string;
  description?: string;
  investments: Investment[];
  totalValue: number;
  totalReturns: number;
  performance: PortfolioPerformance;
  createdAt: DateString;
  updatedAt: DateString;
}

export interface PortfolioPerformance {
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  beta: number;
  alpha: number;
  maxDrawdown: number;
  volatility: number;
}

// Dashboard State types
export interface DashboardState {
  companies: Company[];
  companyProfiles: Record<UUID, CompanyProfile>;
  stats: DashboardStats;
  aiWatchlist: AIWatchlistItem[];
  investments: Investment[];
  deals: Deal[];
  portfolios: Portfolio[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  filters: DashboardFilters;
}

export interface DashboardFilters {
  search?: string;
  industry?: string;
  status?: Status;
  dateRange?: {
    start: DateString;
    end: DateString;
  };
  valuationRange?: {
    min: number;
    max: number;
  };
  growthRange?: {
    min: number;
    max: number;
  };
}

// Dashboard Actions types
export interface DashboardActions {
  fetchCompanies: (params?: QueryParams) => Promise<void>;
  fetchCompanyProfile: (id: UUID) => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchAIWatchlist: () => Promise<void>;
  fetchInvestments: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  fetchPortfolios: () => Promise<void>;
  updateFilters: (filters: Partial<DashboardFilters>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

// Dashboard Hook types
export interface UseDashboardReturn extends DashboardState, DashboardActions {
  // Additional dashboard-specific methods
  getCompanyById: (id: UUID) => Company | undefined;
  getCompanyProfile: (id: UUID) => CompanyProfile | undefined;
  getTopPerformers: (limit?: number) => Company[];
  getRecentActivity: (limit?: number) => ActivityItem[];
  getPortfolioValue: () => number;
  getTotalReturns: () => number;
}

// Chart types
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

// Widget types
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  data: any;
  config: WidgetConfig;
  position: WidgetPosition;
  size: WidgetSize;
}

export type WidgetType = 
  | 'stats'
  | 'chart'
  | 'table'
  | 'list'
  | 'metric'
  | 'progress'
  | 'gauge'
  | 'heatmap';

export interface WidgetConfig {
  refreshInterval?: number;
  showRefresh?: boolean;
  showExport?: boolean;
  showFilters?: boolean;
  [key: string]: any;
}

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}
