'use client';

import React, { useState } from 'react';
import { EmailVerificationFormData, validateEmailVerification } from '@/shared/validations';

interface EmailVerificationFormProps {
  onSubmit: (formData: EmailVerificationFormData) => void;
  className?: string;
  isLoading?: boolean;
}

export default function EmailVerificationForm({ onSubmit, className = '', isLoading = false }: EmailVerificationFormProps) {
  const [formData, setFormData] = useState<EmailVerificationFormData>({
    verificationCode: ''
  });
  const [errors, setErrors] = useState<Partial<EmailVerificationFormData>>({});

  const handleInputChange = (field: keyof EmailVerificationFormData, value: string) => {
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
    const validationResult = validateEmailVerification(formData);
    
    if (!validationResult.success) {
      const fieldErrors: Partial<EmailVerificationFormData> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EmailVerificationFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    
    // Clear any existing errors
    setErrors({});
    
    // Call the onSubmit callback with validated data
    onSubmit(validationResult.data);
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-md mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-md mx-auto'>
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
            Forgot Password?
          </h2>
          <p className="text-base font-text text-gray-600">
            Enter the verification code sent to your email
          </p>
        </div>

      {/* Email Verification Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Verification Code Field */}
        <div>
          <label 
            htmlFor="verificationCode"
            className="block text-sm font-medium font-text text-[#2F2B36] mb-2"
          >
            Verification code
          </label>
          <input
            type="text"
            id="verificationCode"
            value={formData.verificationCode}
            onChange={(e) => handleInputChange('verificationCode', e.target.value)}
            placeholder="code"
            required
            maxLength={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400 ${
              errors.verificationCode ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.verificationCode && (
            <p className="mt-1 text-sm text-red-600 font-text">{errors.verificationCode}</p>
          )}
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-8 py-3 rounded-lg font-text text-white transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Reset Password'}
        </button>
      </form>
      </div>
    </div>
  );
}
