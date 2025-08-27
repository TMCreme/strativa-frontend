'use client';

import React, { useState, useRef, useCallback } from 'react';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  selectedFile?: File | null;
  uploadProgress?: number;
  isUploading?: boolean;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export default function FileUpload({
  label,
  onFileSelect,
  onFileRemove,
  selectedFile,
  uploadProgress = 0,
  isUploading = false,
  className = '',
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 10
}: FileUploadProps) {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setError('');
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError('File must be PDF, JPEG, or PNG');
      return false;
    }

    return true;
  };

  const handleFileSelect = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect, maxSize]);



  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      default:
        return '📎';
    }
  };

  return (
    <div className={`space-y-4 border border-gray-300 rounded-lg p-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-medium font-text text-[#2F2B36]">
          {label}
        </h3>
        <button
          type="button"
          onClick={handleClick}
          className="text-4xl font-thin text-[#141B34] hover:scale-125 transition-colors"
        >
          +
        </button>
      </div>

      {/* File Display - Only show when file is selected */}
      {selectedFile && (
        <div className="space-y-3">
          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* File Name with Remove Button */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getFileIcon(selectedFile.name)}</span>
              <div>
                <p className="text-sm font-text text-gray-900">{selectedFile.name}</p>
                <p className="text-xs font-text text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
                         <button
               type="button"
               onClick={onFileRemove}
               className="text-red-500 hover:text-red-700 transition-colors p-1"
               title="Remove file"
             >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
               </svg>
             </button>
          </div>
        </div>
      )}



       {/* Error Message */}
       {error && (
         <p className="text-sm text-red-600 font-text">{error}</p>
       )}

       {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}
