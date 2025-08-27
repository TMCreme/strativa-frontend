'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/shared/components';
import { DocumentUploadData, validateDocumentUpload } from '@/shared/validations';

interface DocumentUploadFormProps {
  onSubmit: (formData: DocumentUploadData) => void;
  className?: string;
  isLoading?: boolean;
}

export default function DocumentUploadForm({ onSubmit, className = '', isLoading = false }: DocumentUploadFormProps) {
  const [formData, setFormData] = useState<DocumentUploadData>({
    regulatoryLicense: null as any,
    additionalRegulatoryDoc: null as any,
    supportingRegulatoryDoc: null as any,
    representativeId: null as any,
    dragDropDocument: null as any,
    institutionalBankDetails: null as any,
    finalDocument: null as any
  } as any);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState({
    regulatoryLicense: 0,
    additionalRegulatoryDoc: 0,
    supportingRegulatoryDoc: 0,
    representativeId: 0,
    dragDropDocument: 0,
    institutionalBankDetails: 0,
    finalDocument: 0
  });
  const [isUploading, setIsUploading] = useState({
    regulatoryLicense: false,
    additionalRegulatoryDoc: false,
    supportingRegulatoryDoc: false,
    representativeId: false,
    dragDropDocument: false,
    institutionalBankDetails: false,
    finalDocument: false
  });

  const handleFileSelect = async (file: File, field: keyof DocumentUploadData) => {
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

  const handleFileRemove = (field: keyof DocumentUploadData) => {
    setFormData(prev => ({
      ...prev,
      [field]: null as any
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
    const validationResult = validateDocumentUpload(formData);
    
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
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

  const isAnyUploading = isUploading.regulatoryLicense || isUploading.representativeId || isUploading.institutionalBankDetails;
  const isFormComplete = formData.regulatoryLicense && formData.representativeId && formData.institutionalBankDetails;

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-2xl mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto'>
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
            Document Upload
          </h2>
          <p className="text-base font-text text-gray-600">
            Please upload your required documents
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

          {/* Representative ID Upload */}
          <FileUpload
            label="ID of Representative"
            onFileSelect={(file) => handleFileSelect(file, 'representativeId')}
            onFileRemove={() => handleFileRemove('representativeId')}
            selectedFile={formData.representativeId}
            uploadProgress={uploadProgress.representativeId}
            isUploading={isUploading.representativeId}
          />

          {errors.representativeId && (
            <p className="text-sm text-red-600 font-text">{errors.representativeId}</p>
          )}

          {/* Institutional Bank Details Upload */}
          <FileUpload
            label="Institutional bank Account Details"
            onFileSelect={(file) => handleFileSelect(file, 'institutionalBankDetails')}
            onFileRemove={() => handleFileRemove('institutionalBankDetails')}
            selectedFile={formData.institutionalBankDetails}
            uploadProgress={uploadProgress.institutionalBankDetails}
            isUploading={isUploading.institutionalBankDetails}
          />

          {errors.institutionalBankDetails && (
            <p className="text-sm text-red-600 font-text">{errors.institutionalBankDetails}</p>
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
