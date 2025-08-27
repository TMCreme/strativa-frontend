'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthLayout({ children, className = '' }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-8">
          <Link href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            Product
          </Link>
          <Link href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            Download
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className={`w-full max-w-md ${className}`}>
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Image src="/images/Icon & Text (1) 1.svg" alt="logo" width={100} height={100} />
            </div>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
