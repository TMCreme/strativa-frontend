'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LoginFormData, validateLoginForm } from '@/shared/validations';

interface LoginFormProps {
  onLogin: (formData: LoginFormData) => void;
  className?: string;
  isLoading?: boolean;
}

export default function LoginForm({ onLogin, className = '', isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validationResult = validateLoginForm(formData);
    
    if (!validationResult.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    // Clear any existing errors
    setErrors({});
    
    // Call the onLogin callback with validated data
    onLogin(validationResult.data);
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-md mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-md mx-auto'>
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
            Login
          </h2>
          <p className="text-base font-text text-gray-600">
            Welcome back, we're glad to have you
          </p>
        </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label 
            htmlFor="email"
            className="block text-sm font-medium font-text text-[#2F2B36] mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="e.g Acme Investments"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 font-text">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label 
            htmlFor="password"
            className="block text-sm font-medium font-text text-[#2F2B36] mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder="XXXXXXXXXXXXX"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 font-text">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link 
            href="/forgot-password"
            className="text-sm font-text text-[#2F2B36] hover:text-green-600 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-8 py-3 rounded-lg font-text text-white transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      </div>
    </div>
  );
}
