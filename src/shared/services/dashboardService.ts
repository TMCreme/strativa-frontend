import api from './api';

export interface DashboardStat {
  id: number;
  title: string;
  value: string;
  change: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  bgColor: string;
}

export interface AIWatchlistItem {
  id: number;
  code: string;
  label: string;
  color: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  aiWatchlist: AIWatchlistItem[];
}

class DashboardService {
  async getDashboardStats(): Promise<DashboardStat[]> {
    const response = await api.get('/dashboardStats');
    return response.data;
  }

  async getAIWatchlist(): Promise<AIWatchlistItem[]> {
    const response = await api.get('/aiWatchlist');
    return response.data;
  }

  async getDashboardData(): Promise<DashboardData> {
    const [stats, aiWatchlist] = await Promise.all([
      this.getDashboardStats(),
      this.getAIWatchlist(),
    ]);

    return {
      stats,
      aiWatchlist,
    };
  }
}

export default new DashboardService();
