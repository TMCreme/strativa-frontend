'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '../stores/sidebarStore';

interface TopNavbarProps {
  breadcrumbs?: React.ReactNode;
  className?: string;
}

export default function TopNavbar({ breadcrumbs, className = '' }: TopNavbarProps) {
  const { toggle } = useSidebarStore();
  const pathname = usePathname();

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    if (pathname.includes('/investor/dashboard/profile')) {
      return (
        <>
          <Image src="/icons/Star.png" alt="Dashboard" width={20} height={20} />
          <Link href="/investor/dashboard" className="hover:text-gray-800 transition-colors">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Profile</span>
        </>
      );
    }
    
    if (pathname.includes('/investor/virtual-deal-room')) {
      return (
        <>
          <Image src="/icons/Star.png" alt="Dashboard" width={20} height={20} />
          <Link href="/investor/dashboard" className="hover:text-gray-800 transition-colors">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Virtual Deal Room</span>
        </>
      );
    }

    if (pathname.includes('/investor/socials')) {
      return (
        <>
          <Image src="/icons/Star.png" alt="Dashboard" width={20} height={20} />
          <Link href="/investor/dashboard" className="hover:text-gray-800 transition-colors">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Socials</span>
        </>
      );
    }

    if (pathname.includes('/investor/settings')) {
      return (
        <>
          <Image src="/icons/Star.png" alt="Dashboard" width={20} height={20} />
          <Link href="/investor/dashboard" className="hover:text-gray-800 transition-colors">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Settings</span>
        </>
      );
    }

    if (pathname.includes('/investor/help-support')) {
      return (
        <>
          <Image src="/icons/Star.png" alt="Dashboard" width={20} height={20} />
          <Link href="/investor/dashboard" className="hover:text-gray-800 transition-colors">
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Help & Support</span>
        </>
      );
    }

    // Default breadcrumbs for dashboard
    return (
      <>
        <Image src="/icons/Star.png" alt="Dashboard" width={20} height={20} />
        <span className="text-gray-900 font-medium">Dashboards</span>
      </>
    );
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbs || (
            <>
              <button 
                onClick={toggle}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                title="Toggle Sidebar"
              >
                <Image src="/icons/IconSet.png" alt="Dashboard" width={20} height={20} />
              </button>
              {generateBreadcrumbs()}
            </>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-xs text-gray-400">⌘/</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4H19a2 2 0 012 2v6.82a2 2 0 01-.59 1.41l-6.82 6.82a2 2 0 01-1.41.59H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
