'use client';

import React, { useState } from 'react';
import { NewPasswordFormData, validateNewPassword } from '@/shared/validations';

interface NewPasswordFormProps {
  onSubmit: (formData: NewPasswordFormData) => void;
  className?: string;
  isLoading?: boolean;
}

export default function NewPasswordForm({ onSubmit, className = '', isLoading = false }: NewPasswordFormProps) {
  const [formData, setFormData] = useState<NewPasswordFormData>({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<NewPasswordFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: keyof NewPasswordFormData, value: string) => {
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
    const validationResult = validateNewPassword(formData);
    
    if (!validationResult.success) {
      const fieldErrors: Partial<NewPasswordFormData> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof NewPasswordFormData;
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

  // Calculate password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 3);
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-md mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-md mx-auto'>
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
            New password
          </h2>
          <p className="text-base font-text text-gray-600">
            Enter a new password to recover your account
          </p>
        </div>

      {/* New Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* New Password Field */}
        <div>
          <label 
            htmlFor="newPassword"
            className="block text-sm font-medium font-text text-[#2F2B36] mb-2"
          >
            Enter new password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              placeholder="new password"
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400 pr-12 ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p className="mt-2 text-xs font-text text-gray-500">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </p>
          {/* Password Strength Indicator */}
          <div className="mt-2 flex space-x-1">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded ${
                  index < passwordStrength 
                    ? passwordStrength === 1 
                      ? 'bg-red-500' 
                      : passwordStrength === 2 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600 font-text">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label 
            htmlFor="confirmPassword"
            className="block text-sm font-medium font-text text-[#2F2B36] mb-2"
          >
            Re-enter password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="new password"
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400 pr-12 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 font-text">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-8 py-3 rounded-lg font-text text-white transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      </div>
    </div>
  );
}
