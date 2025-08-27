'use client';

import { Footer } from "@/features/LandingPage/conponents";
import Link from "next/link";

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
          Investment Opportunities
        </h1>
        <p className="text-lg font-text text-gray-600 mb-8">
          Discover investment opportunities and grow your portfolio with Strativa.
        </p>
        
        {/* Call to Action */}
        <div className="bg-[#F9F9F9] rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-base font-text text-gray-600 mb-6">
            Join our platform to access exclusive investment opportunities in private companies across Africa.
          </p>
          <Link 
            href="/investor/register" 
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-text hover:bg-green-700 transition-colors"
          >
            Register as an Investor
          </Link>
        </div>

        {/* Placeholder for investment opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold font-display text-[#2F2B36] mb-2">
              Featured Opportunities
            </h3>
            <p className="text-sm font-text text-gray-600">
              Explore our curated selection of high-potential investment opportunities.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold font-display text-[#2F2B36] mb-2">
              Market Insights
            </h3>
            <p className="text-sm font-text text-gray-600">
              Get access to detailed market analysis and investment research.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold font-display text-[#2F2B36] mb-2">
              Portfolio Management
            </h3>
            <p className="text-sm font-text text-gray-600">
              Track and manage your investments with our advanced portfolio tools.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
