'use client';

import React, { useEffect, useCallback } from 'react';
import { useDashboardStore } from '@/shared/stores/dashboardStore';
import { Company } from '@/shared/services/companiesService';
import Link from 'next/link';
import { StatCard, DataTable, Pagination, CompanyCell } from '@/features/Investor/components/dashboard';

export default function DashboardPage() {
  const {
    companies = [],
    stats,
    isLoadingCompanies,
    isLoadingStats,
    companiesError,
    statsError,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    searchQuery,
    fetchCompanies,
    fetchStats,
    setSearchQuery,
    setCurrentPage,
    clearErrors
  } = useDashboardStore();

  const memoizedFetchCompanies = useCallback(() => {
    fetchCompanies({
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery
    });
  }, [fetchCompanies, currentPage, itemsPerPage, searchQuery]);

  const memoizedFetchStats = useCallback(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    memoizedFetchCompanies();
    memoizedFetchStats();
  }, [memoizedFetchCompanies, memoizedFetchStats]);

  const columns = [
    {
      key: 'company',
      label: 'Company',
      render: (value: string, row: Company) => <CompanyCell value={value} row={row} />
    },
    { key: 'sector', label: 'Sector' },
    { key: 'stage', label: 'Stage' },
    {
      key: 'date',
      label: 'Date',
      render: (value: string) => (
        <div className="flex items-center text-sm text-gray-900">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {value}
        </div>
      )
    },
    { key: 'geography', label: 'Geography' },
    { key: 'valuation', label: 'Valuation Band' },
    {
      key: 'action',
      label: 'Action Button',
      render: (value: string, row: Company) => (
        <Link href={`/investor/dashboard/profile?companyId=${row.id}`}>
          <button className="text-gray-600 hover:text-gray-800 font-medium">
            View Profile
          </button>
        </Link>
      )
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAdd = () => {
    console.log('Add new company');
  };

  const handleFilter = () => {
    console.log('Filter companies');
  };

  const handleSort = () => {
    console.log('Sort companies');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRetry = () => {
    clearErrors();
    memoizedFetchCompanies();
    memoizedFetchStats();
  };

  return (
    <>
      {/* Error Messages */}
      {(statsError || companiesError) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
                <p className="text-sm text-red-700 mt-1">
                  {statsError && 'Failed to load dashboard stats. '}
                  {companiesError && 'Failed to load companies. '}
                  Please check if the json-server is running on port 3002.
                </p>
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
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoadingStats ? (
          // Loading skeleton for stats
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-xl animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))
        ) : statsError ? (
          // Error state for stats
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))
        ) : stats.length > 0 ? (
          stats.map((stat) => {
            console.log('🎨 Rendering stat card:', stat);
            return (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                gradientFrom={stat.gradientFrom}
                gradientTo={stat.gradientTo}
                textColor={stat.textColor}
                bgColor={stat.bgColor}
              />
            );
          })
        ) : (
          // Empty state for stats
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))
        )}
      </div>

      {/* Companies Table */}
      <div className="mb-8">
        {isLoadingCompanies ? (
          // Loading skeleton for table
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : companiesError ? (
          // Error state for table
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No companies available</h3>
              <p className="mt-1 text-sm text-gray-500">Failed to load company data.</p>
            </div>
          </div>
        ) : (
          <DataTable
            title="Name of Company"
            columns={columns}
            data={companies}
            onAdd={handleAdd}
            onFilter={handleFilter}
            onSort={handleSort}
            onSearch={handleSearch}
          />
        )}
      </div>

      {/* Pagination */}
      {!isLoadingCompanies && !companiesError && companies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
