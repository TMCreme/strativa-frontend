"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full container mx-auto py-5 px-4 md:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mt-6"
          >
            <Image
              src="/images/Icon & Text (1) 1.svg"
              alt="Logo"
              width={1020}
              height={1020}
            />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* Mobile Hamburger Menu */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/Icon & Text (1) 1.svg"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="font-text font-medium text-lg text-[#2F2B36]">
              Strativa
            </span>
          </div>
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close mobile menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="p-6">
          <div className="space-y-6">
            <Link
              href="/invest"
              onClick={closeMobileMenu}
              className="block font-text font-normal text-lg text-gray-700 hover:text-[#2F2B36] transition-colors py-2"
            >
              Invest
            </Link>

            <Link
              href="/raise-capital"
              onClick={closeMobileMenu}
              className="block font-text font-normal text-lg text-gray-700 hover:text-[#2F2B36] transition-colors py-2"
            >
              Raise capital
            </Link>

            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block font-text font-normal text-lg text-gray-700 hover:text-[#2F2B36] transition-colors py-2"
            >
              About
            </Link>

            <div className="pt-4">
              <Link
                href="/investor/login"
                onClick={closeMobileMenu}
                className="block font-text font-normal text-lg bg-[#0A1F44] text-white px-6 py-3 rounded-full hover:bg-[#081a3a] transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Additional Mobile Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              <Link
                href="/get-started"
                onClick={closeMobileMenu}
                className="block font-text font-normal text-base text-gray-600 hover:text-[#2F2B36] transition-colors py-2"
              >
                How it works
              </Link>

              <Link
                href="/company/register"
                onClick={closeMobileMenu}
                className="block font-text font-normal text-base text-gray-600 hover:text-[#2F2B36] transition-colors py-2"
              >
                Company Registration
              </Link>

              <Link
                href="/investor/register"
                onClick={closeMobileMenu}
                className="block font-text font-normal text-base text-gray-600 hover:text-[#2F2B36] transition-colors py-2"
              >
                Investor Registration
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
