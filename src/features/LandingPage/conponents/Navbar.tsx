'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className=" w-full container mx-auto py-5 px-10">
        <div className="flex items-center justify-between h-16">
            <button onClick={() => router.push('/')} className=" w-[100px] h-[100px] mt-6">
              <Image src="/images/Icon & Text (1) 1.svg" alt="Logo" width={1020} height={1020} />
            </button>


          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/invest" 
              className="font-text font-normal text-lg text-gray-700 hover:text-[#2F2B36] transition-colors"
            >
              Invest
            </Link>
            
            <Link 
              href="/raise-capital" 
              className="font-text font-normal text-lg text-gray-700 hover:text-[#2F2B36] transition-colors"
            >
              Raise capital
            </Link>
            
            <Link 
              href="/about" 
              className="font-text font-normal text-lg text-gray-700 hover:text-[#2F2B36] transition-colors"
            >
              About
            </Link>
            
            <Link 
              href="/investor/login" 
              className="font-text font-normal text-lg bg-[#0A1F44] text-white px-6 py-2 rounded-full hover:bg-[#081a3a] transition-colors"
            >
              Get Started
            </Link>
          </div>

      </div>
    </nav>
  );
}
