'use client';

import React from 'react';
import Image from 'next/image';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onFilter?: () => void;
  onSort?: () => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  className?: string;
}

export default function DataTable({
  title,
  columns,
  data = [],
  onAdd,
  onFilter,
  onSort,
  onSearch,
  searchPlaceholder = "Search...",
  className = ''
}: DataTableProps) {
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
      {/* Table Title */}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>

      {/* Control Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between p-3  bg-gray-50 border-b border-gray-200 rounded-lg">
          {/* Left side - Action buttons */}
          <div className="flex items-center justify-center space-x-3">
            {onAdd && (
              <button 
                onClick={onAdd}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                title="Add new item"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            {onFilter && (
              <button 
                onClick={onFilter}
                className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                title="Filter"
              >
                <Image src="/icons/FunnelSimple.png" alt="Filter" width={20} height={20} />
              </button>
            )}
            {onSort && (
              <button 
                onClick={onSort}
                className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                title="Sort"
              >
                <Image src="/icons/IconSet (1).png" alt="Sort" width={20} height={20} />
              </button>
            )}
          </div>

          {/* Right side - Search */}
          {onSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr className="border-b border-gray-300 mx-6">
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{
                    fontSize: '12px',
                    lineHeight: '18px',
                    letterSpacing: '4px'
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {safeData.length > 0 ? (
              safeData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                      {column.render 
                        ? column.render(row[column.key], row)
                        : <span className="text-sm text-gray-900">{row[column.key]}</span>
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No data available</h3>
                    <p className="mt-1 text-sm text-gray-500">No companies found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
