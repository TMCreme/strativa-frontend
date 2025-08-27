import { Footer } from "@/features/LandingPage/conponents";
import Link from "next/link";

export default function CompanyRegisterPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-8">
          <a href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            Product
          </a>
          <a href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            About
          </a>
          <a href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            Download
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-display text-[#2F2B36] mb-8">
            Company Registration
          </h1>
          <p className="text-lg font-text text-gray-600 mb-8">
            Register your company to start raising capital on Strativa.
          </p>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-4">
              Coming Soon
            </h2>
            <p className="text-base font-text text-gray-600">
              Company registration functionality is currently under development. 
              Please check back soon or contact us for more information.
            </p>
            
            <Link 
              href="/" 
              className="inline-block mt-6 px-8 py-3 bg-green-600 text-white rounded-lg font-text hover:bg-green-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
