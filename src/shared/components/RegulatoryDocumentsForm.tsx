'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/shared/components';

interface RegulatoryDocumentsData {
  regulatoryLicense: File | null;
  additionalRegulatoryDoc: File | null;
  supportingRegulatoryDoc: File | null;
}

interface RegulatoryDocumentsFormProps {
  onSubmit: (formData: RegulatoryDocumentsData) => void;
  className?: string;
  isLoading?: boolean;
}

export default function RegulatoryDocumentsForm({ onSubmit, className = '', isLoading = false }: RegulatoryDocumentsFormProps) {
  const [formData, setFormData] = useState<RegulatoryDocumentsData>({
    regulatoryLicense: null,
    additionalRegulatoryDoc: null,
    supportingRegulatoryDoc: null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState({
    regulatoryLicense: 0,
    additionalRegulatoryDoc: 0,
    supportingRegulatoryDoc: 0
  });
  const [isUploading, setIsUploading] = useState({
    regulatoryLicense: false,
    additionalRegulatoryDoc: false,
    supportingRegulatoryDoc: false
  });

  const handleFileSelect = async (file: File, field: keyof RegulatoryDocumentsData) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));

    // Clear any existing errors
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Simulate upload process
    setIsUploading(prev => ({
      ...prev,
      [field]: true
    }));
    setUploadProgress(prev => ({
      ...prev,
      [field]: 0
    }));

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev[field] + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(prevState => ({
            ...prevState,
            [field]: false
          }));
          return {
            ...prev,
            [field]: 100
          };
        }
        return {
          ...prev,
          [field]: newProgress
        };
      });
    }, 200);
  };

  const handleFileRemove = (field: keyof RegulatoryDocumentsData) => {
    setFormData(prev => ({
      ...prev,
      [field]: null
    }));
    setUploadProgress(prev => ({
      ...prev,
      [field]: 0
    }));
    setIsUploading(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const stepErrors: Record<string, string> = {};
    if (!formData.regulatoryLicense) {
      stepErrors.regulatoryLicense = 'Please upload your regulatory license';
    }
    if (!formData.additionalRegulatoryDoc) {
      stepErrors.additionalRegulatoryDoc = 'Please upload additional regulatory document';
    }
    if (!formData.supportingRegulatoryDoc) {
      stepErrors.supportingRegulatoryDoc = 'Please upload supporting regulatory document';
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    // Clear any existing errors
    setErrors({});
    
    // Call the onSubmit callback with validated data
    onSubmit(formData);
  };

  const isAnyUploading = isUploading.regulatoryLicense || isUploading.additionalRegulatoryDoc || isUploading.supportingRegulatoryDoc;
  const isFormComplete = formData.regulatoryLicense && formData.additionalRegulatoryDoc && formData.supportingRegulatoryDoc;

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-2xl mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto'>
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
            Regulatory Documents
          </h2>
          <p className="text-base font-text text-gray-600">
            Please upload your regulatory license
          </p>
        </div>

        {/* Document Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Regulatory License Upload */}
          <FileUpload
            label="Regulatory license"
            onFileSelect={(file) => handleFileSelect(file, 'regulatoryLicense')}
            onFileRemove={() => handleFileRemove('regulatoryLicense')}
            selectedFile={formData.regulatoryLicense}
            uploadProgress={uploadProgress.regulatoryLicense}
            isUploading={isUploading.regulatoryLicense}
          />

          {errors.regulatoryLicense && (
            <p className="text-sm text-red-600 font-text">{errors.regulatoryLicense}</p>
          )}

          {/* Additional Regulatory Document Upload */}
          <FileUpload
            label="Additional Regulatory Document"
            onFileSelect={(file) => handleFileSelect(file, 'additionalRegulatoryDoc')}
            onFileRemove={() => handleFileRemove('additionalRegulatoryDoc')}
            selectedFile={formData.additionalRegulatoryDoc}
            uploadProgress={uploadProgress.additionalRegulatoryDoc}
            isUploading={isUploading.additionalRegulatoryDoc}
          />

          {errors.additionalRegulatoryDoc && (
            <p className="text-sm text-red-600 font-text">{errors.additionalRegulatoryDoc}</p>
          )}

          {/* Supporting Regulatory Document Upload */}
          <FileUpload
            label="Supporting Regulatory Document"
            onFileSelect={(file) => handleFileSelect(file, 'supportingRegulatoryDoc')}
            onFileRemove={() => handleFileRemove('supportingRegulatoryDoc')}
            selectedFile={formData.supportingRegulatoryDoc}
            uploadProgress={uploadProgress.supportingRegulatoryDoc}
            isUploading={isUploading.supportingRegulatoryDoc}
          />

          {errors.supportingRegulatoryDoc && (
            <p className="text-sm text-red-600 font-text">{errors.supportingRegulatoryDoc}</p>
          )}

          {/* Next Button */}
          <button
            type="submit"
            disabled={isLoading || !isFormComplete || isAnyUploading}
            className="w-full px-8 py-3 rounded-lg font-text text-white transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Next'}
          </button>
        </form>
      </div>
    </div>
  );
}
