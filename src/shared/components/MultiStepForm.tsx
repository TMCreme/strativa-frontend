'use client';

import React from 'react';
import { useMultiStepForm } from '../hooks/useMultiStepForm';

export interface FormStep {
  id: string;
  title: string;
  subtitle: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  accept?: string;
  maxSize?: number;
}

interface MultiStepFormProps {
  steps: FormStep[];
  onComplete: (formData: Record<string, unknown>) => void;
  className?: string;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  formData?: Record<string, unknown>;
  onFormDataChange?: (formData: Record<string, unknown>) => void;
}

export default function MultiStepForm({ steps, onComplete, className = '', currentStep: externalCurrentStep, onStepChange, formData: externalFormData, onFormDataChange }: MultiStepFormProps) {
  const {
    formData: internalFormData,
    next,
    previous,
    updateFormData,
    currentStep: internalCurrentStep
  } = useMultiStepForm(steps);

  // Use external form data if provided, otherwise use internal
  const formData = externalFormData !== undefined ? externalFormData : internalFormData;

  // Use external current step if provided, otherwise use internal
  const currentStep = externalCurrentStep !== undefined ? externalCurrentStep : internalCurrentStep;
  
  // Get the current step data based on the current step
  const currentStepData = steps[currentStep];
  
  // Calculate step states
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleInputChange = (fieldId: string, value: string) => {
    if (onFormDataChange) {
      const newFormData = { ...formData, [fieldId]: value };
      onFormDataChange(newFormData);
    } else {
      updateFormData(fieldId, value);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(formData);
    } else {
      if (onStepChange) {
        onStepChange(currentStep + 1);
      } else {
        next();
      }
    }
  };

  const handlePrevious = () => {
    previous();
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-2xl mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto'>
      {/* Welcome Message */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
          {currentStepData.title}
        </h2>
        <p className="text-base font-text text-gray-600">
          {currentStepData.subtitle}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {currentStepData.fields.map((field) => (
          <div key={field.id}>
            <label 
              htmlFor={field.id}
              className="block text-sm font-medium font-text text-[#2F2B36] mb-2"
            >
              {field.label}
            </label>
            
            {field.type === 'select' ? (
              <select
                id={field.id}
                value={(formData[field.id] as string) || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                required={field.required}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400"
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.id}
                value={(formData[field.id] as string) || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400 resize-none"
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                value={(formData[field.id] as string) || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-text text-[#2F2B36] placeholder-gray-400"
              />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleNext}
          className="w-full px-8 py-3 rounded-lg font-text text-white transition-colors bg-green-600 hover:bg-green-700"
        >
          {isLastStep ? 'Complete' : 'Next'}
        </button>
      </div>
      </div>
    </div>
  );
}
