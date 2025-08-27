'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/shared/components';

interface IdentityDocumentsData {
  representativeId: File | null;
  dragDropDocument: File | null;
  institutionalBankDetails: File | null;
  finalDocument: File | null;
}

interface IdentityDocumentsFormProps {
  onSubmit: (formData: IdentityDocumentsData) => void;
  className?: string;
  isLoading?: boolean;
}

export default function IdentityDocumentsForm({ onSubmit, className = '', isLoading = false }: IdentityDocumentsFormProps) {
  const [formData, setFormData] = useState<IdentityDocumentsData>({
    representativeId: null,
    dragDropDocument: null,
    institutionalBankDetails: null,
    finalDocument: null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState({
    representativeId: 0,
    dragDropDocument: 0,
    institutionalBankDetails: 0,
    finalDocument: 0
  });
  const [isUploading, setIsUploading] = useState({
    representativeId: false,
    dragDropDocument: false,
    institutionalBankDetails: false,
    finalDocument: false
  });

  const handleFileSelect = async (file: File, field: keyof IdentityDocumentsData) => {
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

  const handleFileRemove = (field: keyof IdentityDocumentsData) => {
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
    if (!formData.representativeId) {
      stepErrors.representativeId = 'Please upload ID of Representative';
    }
    if (!formData.dragDropDocument) {
      stepErrors.dragDropDocument = 'Please upload drag & drop document';
    }
    if (!formData.institutionalBankDetails) {
      stepErrors.institutionalBankDetails = 'Please upload institutional bank details';
    }
    if (!formData.finalDocument) {
      stepErrors.finalDocument = 'Please upload final document';
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

  const isAnyUploading = isUploading.representativeId || isUploading.dragDropDocument || 
                        isUploading.institutionalBankDetails || isUploading.finalDocument;
  const isFormComplete = formData.representativeId && formData.dragDropDocument && 
                        formData.institutionalBankDetails && formData.finalDocument;

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-2xl mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto'>
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
            Identity Documents
          </h2>
          <p className="text-base font-text text-gray-600">
            Please upload your identity and bank documents
          </p>
        </div>

        {/* Document Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ID of Representative Upload */}
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

          {/* Drag & Drop Document Upload */}
          <FileUpload
            label="Drag & Drop Document"
            onFileSelect={(file) => handleFileSelect(file, 'dragDropDocument')}
            onFileRemove={() => handleFileRemove('dragDropDocument')}
            selectedFile={formData.dragDropDocument}
            uploadProgress={uploadProgress.dragDropDocument}
            isUploading={isUploading.dragDropDocument}
          />

          {errors.dragDropDocument && (
            <p className="text-sm text-red-600 font-text">{errors.dragDropDocument}</p>
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

          {/* Final Document Upload */}
          <FileUpload
            label="Final Document"
            onFileSelect={(file) => handleFileSelect(file, 'finalDocument')}
            onFileRemove={() => handleFileRemove('finalDocument')}
            selectedFile={formData.finalDocument}
            uploadProgress={uploadProgress.finalDocument}
            isUploading={isUploading.finalDocument}
          />

          {errors.finalDocument && (
            <p className="text-sm text-red-600 font-text">{errors.finalDocument}</p>
          )}

          {/* Complete Button */}
          <button
            type="submit"
            disabled={isLoading || !isFormComplete || isAnyUploading}
            className="w-full px-8 py-3 rounded-lg font-text text-white transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Complete'}
          </button>
        </form>
      </div>
    </div>
  );
}
