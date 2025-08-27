'use client';

import React, { useState } from 'react';
import { Company } from '@/shared/services/companiesService';

interface CompanyCellProps {
  value: string;
  row: Company;
}

export default function CompanyCell({ value, row }: CompanyCellProps) {
  const [imageError, setImageError] = useState(false);
  
  const getCompanyInitials = (companyName: string) => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (companyName: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < companyName.length; i++) {
      hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getCompanyInitials(row.company);
  const avatarColor = getAvatarColor(row.company);

  return (
    <div className="flex items-center">
      {!imageError ? (
        <img 
          src={row.logo} 
          alt={row.company}
          className="w-8 h-8 rounded-full mr-3"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-xs font-semibold ${avatarColor}`}>
          {initials}
        </div>
      )}
      <div className="text-sm font-medium text-gray-900">{value}</div>
    </div>
  );
}
