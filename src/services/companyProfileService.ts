import api from '../shared/services/api';

export interface CompanyProfile {
  id: number;
  companyId: number;
  companyName: string;
  companyType: string;
  logo: string;
  overview: {
    views: string;
    revenue: string;
    reviews: string;
    rating: number;
  };
  information: {
    registrationAddress: string;
    businessName: string;
    registrationDate: string;
    registrationCode: string;
    legalForm: string;
    shareCapital: string;
  };
  valuation: {
    minValue: string;
    medValue: string;
    maxValue: string;
  };
  growthPerformance: Array<{
    month: string;
    value: number;
  }>;
  currentOpenings: {
    pricePerShare: string;
    minimumInvestment: string;
    status: string;
    expiry: string;
  };
  team: Array<{
    name: string;
    position: string;
    initials: string;
    image: string;
  }>;
  documents: Array<{
    id: number;
    name: string;
    size: string;
    type: string;
  }>;
}

export interface CompanyProfileResponse {
  data: CompanyProfile;
}

class CompanyProfileService {
  async getCompanyProfile(companyId: number): Promise<CompanyProfileResponse> {
    try {
      const response = await api.get(`/companyProfiles?companyId=${companyId}`);
      
      if (response.data && response.data.length > 0) {
        return { data: response.data[0] };
      } else {
        throw new Error('Company profile not found');
      }
    } catch (error) {
      console.error('Error fetching company profile:', error);
      throw error;
    }
  }

  async getCompanyProfileById(profileId: number): Promise<CompanyProfileResponse> {
    try {
      const response = await api.get(`/companyProfiles/${profileId}`);
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching company profile by ID:', error);
      throw error;
    }
  }

  async updateCompanyProfile(profileId: number, data: Partial<CompanyProfile>): Promise<CompanyProfileResponse> {
    try {
      const response = await api.patch(`/companyProfiles/${profileId}`, data);
      return { data: response.data };
    } catch (error) {
      console.error('Error updating company profile:', error);
      throw error;
    }
  }
}

export default new CompanyProfileService();
