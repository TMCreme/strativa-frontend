'use client';

import React from 'react';
import Image from 'next/image';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  bgColor: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  change,
  gradientFrom,
  gradientTo,
  textColor,
  bgColor,
  className = ''
}: StatCardProps) {
  // Extract color values from Tailwind classes or use them directly
  const getColorValue = (colorClass: string) => {
    // If it's already a hex color, return it
    if (colorClass.startsWith('#')) {
      return colorClass;
    }
    
    // Extract hex from Tailwind arbitrary value classes
    const match = colorClass.match(/\[#([A-Fa-f0-9]{6})\]/);
    if (match) {
      return `#${match[1]}`;
    }
    
    // Fallback colors
    const colorMap: { [key: string]: string } = {
      'text-[#008000]': '#008000',
      'text-[#0000FF]': '#0000FF',
      'bg-[#CFFFE5]': '#CFFFE5',
      'bg-[#E4EEFF]': '#E4EEFF',
      'from-[#CFFFE5]': '#CFFFE5',
      'to-[#CFFFE5]': '#CFFFE5',
      'from-[#E4EEFF]': '#E4EEFF',
      'to-[#E4EEFF]': '#E4EEFF',
    };
    
    return colorMap[colorClass] || '#6B7280';
  };

  const backgroundColor = getColorValue(gradientFrom);
  const textColorValue = getColorValue(textColor);
  const iconBgColor = getColorValue(bgColor);

  return (
    <div 
      className={`p-6 rounded-xl ${className}`}
      style={{ 
        background: `linear-gradient(to right, ${backgroundColor}, ${getColorValue(gradientTo)})` 
      }}
    >
      <div className="flex flex-col">
        <div>
          <p className="text-sm font-medium" style={{ color: textColorValue }}>{title}</p>
        </div>
        <div className="flex items-center gap-16">
          <p className="text-3xl font-bold" style={{ color: textColorValue }}>{value}</p>
          <div className='flex items-center gap-2 mt-5'>
            <div> 
            {change && <p className="text-sm" style={{ color: textColorValue }}>{change}</p>}
            </div>
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: iconBgColor }}
            >
              <Image 
                src="/icons/ArrowRise.png" 
                alt="Arrow Rise" 
                width={24} 
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
