'use client';

import React, { useState } from 'react';
import { FileUpload, UploadingFileDisplay } from '@/shared/components';

import { DocumentUploadData, validateDocumentUpload } from '@/shared/validations';

interface MultiStepDocumentUploadProps {
  onSubmit: (formData: DocumentUploadData) => void;
  className?: string;
  isLoading?: boolean;
}

export default function MultiStepDocumentUpload({ onSubmit, className = '', isLoading = false }: MultiStepDocumentUploadProps) {
  const [currentStep, setCurrentStep] = useState(0);
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
    console.log(`File selected for field: ${field}`, file.name);
    
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
    console.log(`Starting upload for field: ${field}`);
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
        console.log(`Progress for ${field}: ${newProgress}%`);
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(prevState => ({
            ...prevState,
            [field]: false
          }));
          console.log(`Upload completed for field: ${field}`);
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



  const handleNext = () => {
    if (currentStep === 0) {
      // Validate first step - all 3 regulatory documents required
      const step1Errors: Record<string, string> = {};
      if (!formData.regulatoryLicense) {
        step1Errors.regulatoryLicense = 'Please upload your regulatory license';
      }
      if (!formData.additionalRegulatoryDoc) {
        step1Errors.additionalRegulatoryDoc = 'Please upload additional regulatory document';
      }
      if (!formData.supportingRegulatoryDoc) {
        step1Errors.supportingRegulatoryDoc = 'Please upload supporting regulatory document';
      }
      
      if (Object.keys(step1Errors).length > 0) {
        setErrors(step1Errors);
        return;
      }
      
      setErrors({});
      setCurrentStep(1);
    } else {
      // Validate second step - all 4 documents required (removed uploadingDocument)
      const step2Errors: Record<string, string> = {};
      if (!formData.representativeId) {
        step2Errors.representativeId = 'Please upload ID of Representative';
      }
      if (!formData.dragDropDocument) {
        step2Errors.dragDropDocument = 'Please upload drag & drop document';
      }
      if (!formData.institutionalBankDetails) {
        step2Errors.institutionalBankDetails = 'Please upload institutional bank details';
      }
      if (!formData.finalDocument) {
        step2Errors.finalDocument = 'Please upload final document';
      }
      
      if (Object.keys(step2Errors).length > 0) {
        setErrors(step2Errors);
        return;
      }
      
      // Clear any existing errors
      setErrors({});
      
      // Call the onSubmit callback with validated data
      onSubmit(formData);
    }
  };

  const isAnyUploading = isUploading.regulatoryLicense || isUploading.additionalRegulatoryDoc || isUploading.supportingRegulatoryDoc || 
                        isUploading.representativeId || isUploading.dragDropDocument || 
                        isUploading.institutionalBankDetails || isUploading.finalDocument;
  const isFirstStepComplete = formData.regulatoryLicense && formData.additionalRegulatoryDoc && formData.supportingRegulatoryDoc;
  const isSecondStepComplete = formData.representativeId && formData.dragDropDocument && 
                              formData.institutionalBankDetails && formData.finalDocument;

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-8">
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
        </div>
      );
    } else {
      return (
        <div className="space-y-8">
          {/* 1st field: ID of Representative (FileUpload design) */}
          {/* 4th field: Final Document (FileUpload design) */}
          <FileUpload
            label="Final Document"
            onFileSelect={(file) => handleFileSelect(file, 'representativeId')}
            onFileRemove={() => handleFileRemove('finalDocument')}
            selectedFile={formData.representativeId}
            uploadProgress={uploadProgress.representativeId}
            isUploading={isUploading.finalDocument}
          />

          {errors.finalDocument && (
            <p className="text-sm text-red-600 font-text">{errors.finalDocument}</p>
          )}

          {/* 2nd field: Drag & Drop Document */}
          <FileUpload
            label="Drag & Drop Document"
            onFileSelect={(file: File) => handleFileSelect(file, 'dragDropDocument')}
            onFileRemove={() => handleFileRemove('dragDropDocument')}
            selectedFile={formData.dragDropDocument}
            uploadProgress={uploadProgress.dragDropDocument}
            isUploading={isUploading.dragDropDocument}
          />

          {errors.dragDropDocument && (
            <p className="text-sm text-red-600 font-text">{errors.dragDropDocument}</p>
          )}

          {/* 3rd field: Institutional Bank Details (FileUpload design) */}
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

          {/* 4th field: Final Document (FileUpload design) */}
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
        </div>
      );
    }
  };

  const getStepTitle = () => {
    return currentStep === 0 ? 'Regulatory Documents' : 'Identity Documents';
  };

  const getStepSubtitle = () => {
    return currentStep === 0 
      ? 'Please upload your regulatory license' 
      : 'Please upload your identity and bank documents';
  };

  const isNextDisabled = () => {
    if (currentStep === 0) {
      return isLoading || !isFirstStepComplete || isAnyUploading;
    } else {
      return isLoading || !isSecondStepComplete || isAnyUploading;
    }
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#FFFFFF] rounded-2xl shadow-lg p-2 max-w-2xl mx-auto ${className}`}>
      <div className='bg-[#FCFCFC] border border-[#EEEEEE] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto'>
        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-display text-[#2F2B36] mb-2">
            {getStepTitle()}
          </h2>
          <p className="text-base font-text text-gray-600">
            {getStepSubtitle()}
          </p>
        </div>

        

        {/* Step Content */}
        {renderStepContent()}

        {/* Next Button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled()}
            className="w-full px-8 py-3 rounded-lg font-text text-white transition-colors bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : currentStep === 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
