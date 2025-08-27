'use client';

import React from 'react';

interface UploadingFileDisplayProps {
  label: string;
  fileName: string;
  fileSize: string;
  uploadProgress: number;
  onRemove: () => void;
  className?: string;
}

export default function UploadingFileDisplay({
  label,
  fileName,
  fileSize,
  uploadProgress,
  onRemove,
  className = ''
}: UploadingFileDisplayProps) {
  return (
    <div className={`space-y-4 border border-gray-300 rounded-lg p-4 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-medium font-text text-[#2F2B36]">
          {label}
        </h3>
      </div>

      {/* File Display with Progress */}
      <div className="space-y-3">
        {/* File Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-sm font-text text-gray-900">{fileName}</p>
              <p className="text-xs font-text text-gray-500">{fileSize}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>

        {/* Progress Text */}
        <div className="flex justify-between text-xs font-text text-gray-500">
          <span>Uploading...</span>
          <span>{uploadProgress}%</span>
        </div>
      </div>
    </div>
  );
}
