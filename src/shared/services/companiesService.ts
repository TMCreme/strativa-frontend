import api from './api';

export interface Company {
  id: number;
  company: string;
  sector: string;
  stage: string;
  date: string;
  geography: string;
  valuation: string;
  logo: string;
}

export interface CompaniesResponse {
  data: Company[];
  total: number;
  page: number;
  limit: number;
}

class CompaniesService {
  async getCompanies(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sector?: string;
    stage?: string;
  }): Promise<CompaniesResponse> {
    // Filter out empty parameters to avoid json-server filtering issues
    const cleanParams: any = {};
    
    if (params?.page && params.page > 0) cleanParams.page = params.page;
    if (params?.limit && params.limit > 0) cleanParams.limit = params.limit;
    if (params?.search && params.search.trim()) cleanParams.search = params.search.trim();
    if (params?.sector && params.sector.trim()) cleanParams.sector = params.sector.trim();
    if (params?.stage && params.stage.trim()) cleanParams.stage = params.stage.trim();
    
    const response = await api.get('/companies', { params: cleanParams });
    
    // json-server returns an array directly, so we need to wrap it
    const companies = response.data;
    
    return {
      data: companies,
      total: companies.length,
      page: params?.page || 1,
      limit: params?.limit || 10
    };
  }

  async getCompanyById(id: number): Promise<Company> {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  }

  async createCompany(company: Omit<Company, 'id'>): Promise<Company> {
    const response = await api.post('/companies', company);
    return response.data;
  }

  async updateCompany(id: number, company: Partial<Company>): Promise<Company> {
    const response = await api.put(`/companies/${id}`, company);
    return response.data;
  }

  async deleteCompany(id: number): Promise<void> {
    await api.delete(`/companies/${id}`);
  }
}

export default new CompaniesService();
