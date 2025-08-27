'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CompanyProfileContent, ReviewDocumentsContent } from '@/features/Investor/components/dashboard';
import { useCompanyProfileStore } from '@/shared/stores/companyProfileStore';

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId') ? parseInt(searchParams.get('companyId')!) : 1;
  
  const {
    companyProfile,
    isLoading,
    error,
    fetchCompanyProfile,
    clearError
  } = useCompanyProfileStore();

  const memoizedFetchProfile = useCallback(() => {
    fetchCompanyProfile(companyId);
  }, [fetchCompanyProfile, companyId]);

  useEffect(() => {
    memoizedFetchProfile();
  }, [memoizedFetchProfile]);

  const handleRetry = () => {
    clearError();
    memoizedFetchProfile();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton for company overview */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-52 h-52 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className='flex flex-col gap-5'>
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading skeleton for metrics cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          {/* Loading skeleton for tabs */}
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Loading skeleton for content */}
        <div className="space-y-6">
          <div className="h-96 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!companyProfile) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No company profile available</h3>
            <p className="mt-1 text-sm text-gray-500">Company profile data could not be loaded.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Overview Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-52 h-52 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">{companyProfile.logo}</span>
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className="text-2xl font-bold text-gray-900">{companyProfile.companyName}</h1>
            <p className="text-gray-600">{companyProfile.companyType}</p>
          </div>
        </div>

        {/* Metrics Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="flex flex-col gap-3 rounded-l-lg p-4 border border-gray-200">
            <Image src="/icons/list-view.png" alt="Dashboard" width={20} height={20} />
            <h3 className="text-sm font-medium text-gray-600">Company's Views</h3>
            <p className="text-2xl font-bold text-gray-900">{companyProfile.overview.views}</p>
          </div>
          <div className="flex flex-col gap-3 p-4 border border-gray-200 lg:border-r md:border-r-0">
            <Image src="/icons/user-group.png" alt="Dashboard" width={20} height={20} />
            <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">{companyProfile.overview.revenue}</p>
          </div>
          <div className="flex flex-col gap-3 p-4 border border-gray-200 lg:border-r md:border-r-0">
            <Image src="/icons/analytics-02.png" alt="Dashboard" width={20} height={20} />
            <h3 className="text-sm font-medium text-gray-600">Total Reviews</h3>
            <p className="text-2xl font-bold text-gray-900">{companyProfile.overview.reviews}</p>
          </div>
          <div className="flex flex-col gap-3 p-4 rounded-r-lg border border-gray-200">
            <Image src="/icons/star (1).png" alt="Dashboard" width={20} height={20} />
            <h3 className="text-sm font-medium text-gray-600">Overall-ratings</h3>
            <div className="flex items-center space-x-1">
              <p className="text-2xl font-bold text-gray-900">{companyProfile.overview.rating}</p>
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-white rounded-xl shadow-sm p-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Company's Profile
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Review Documents
            </button>
          </nav>
        </section>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' ? (
        <CompanyProfileContent companyProfile={companyProfile} />
      ) : (
        <ReviewDocumentsContent documents={companyProfile.documents} />
      )}
    </div>
  );
}
