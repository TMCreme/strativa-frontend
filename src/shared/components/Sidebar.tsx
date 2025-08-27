'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDashboardStore } from '../stores/dashboardStore';
import { useSidebarStore } from '../stores/sidebarStore';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const pathname = usePathname();
  const { aiWatchlist, fetchAIWatchlist, isLoadingAIWatchlist } = useDashboardStore();
  const { isOpen } = useSidebarStore();
  const [isVirtualDealRoomOpen, setIsVirtualDealRoomOpen] = useState(true);

  const isActive = (path: string) => {
    if (path === '/investor/virtual-deal-room') {
      return pathname === path || pathname.startsWith('/investor/virtual-deal-room/');
    }
    return pathname === path;
  };

  useEffect(() => {
    fetchAIWatchlist();
  }, [fetchAIWatchlist]);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'gray':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const toggleVirtualDealRoom = () => {
    setIsVirtualDealRoomOpen(!isVirtualDealRoomOpen);
  };

  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} bg-white shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Image src="/images/Icon & Text (1) 1.svg" alt="STRATIVA" width={120} height={40} />
        </div>
      </div>

      {/* AI Watchlist */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">AI WATCHLIST</h3>
        <div className="space-y-3">
          {isLoadingAIWatchlist ? (
            <div className="animate-pulse space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-40"></div>
              </div>
            </div>
          ) : (
            aiWatchlist.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${getColorClasses(item.color)} rounded-full flex items-center justify-center`}>
                  <span className="text-xs font-semibold">{item.code}</span>
                </div>
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Menu */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">MAIN MENU</h3>
        <nav className="space-y-2">
          <Link 
            href="/investor/dashboard" 
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
              isActive('/investor/dashboard') 
                ? 'bg-green-50 text-green-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          
          <div className="space-y-1">
            <Link 
              href="/investor/virtual-deal-room"
              className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                isActive('/investor/virtual-deal-room') 
                  ? 'bg-green-50 text-green-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Virtual Deal Room</span>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleVirtualDealRoom();
                }}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isVirtualDealRoomOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
            
            {/* Sub-menu with vertical line */}
            {isVirtualDealRoomOpen && (
              <div className="relative ml-8 space-y-1">
                {/* Vertical line */}
                <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gray-200"></div>
                
                <Link 
                  href="/investor/virtual-deal-room/soft-commit" 
                  className={`relative block px-2 py-1 text-sm transition-colors ${
                    isActive('/investor/virtual-deal-room/soft-commit')
                      ? 'text-green-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="ml-4">Soft Commit</span>
                </Link>
                
                <Link 
                  href="/investor/virtual-deal-room/escrow" 
                  className={`relative block px-2 py-1 text-sm transition-colors ${
                    isActive('/investor/virtual-deal-room/escrow')
                      ? 'text-green-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="ml-4">Escrow</span>
                </Link>
                
                <Link 
                  href="/investor/virtual-deal-room/digital-execution" 
                  className={`relative block px-2 py-1 text-sm transition-colors ${
                    isActive('/investor/virtual-deal-room/digital-execution')
                      ? 'text-green-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="ml-4">Digital Execution</span>
                </Link>
                
                <Link 
                  href="/investor/virtual-deal-room/cap-table" 
                  className={`relative block px-2 py-1 text-sm transition-colors ${
                    isActive('/investor/virtual-deal-room/cap-table')
                      ? 'text-green-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="ml-4">Cap Table</span>
                </Link>
              </div>
            )}
          </div>

          <Link 
            href="/investor/socials" 
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
              isActive('/investor/socials') 
                ? 'bg-green-50 text-green-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Socials</span>
          </Link>

          <Link 
            href="/investor/settings" 
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
              isActive('/investor/settings') 
                ? 'bg-green-50 text-green-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>
      </div>

      {/* Support */}
      <div className="p-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">SUPPORT</h3>
        <nav className="space-y-2">
          <Link 
            href="/investor/help-support" 
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
              isActive('/investor/help-support') 
                ? 'bg-green-50 text-green-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-sm font-medium">Help & Support</span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Log Out</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
