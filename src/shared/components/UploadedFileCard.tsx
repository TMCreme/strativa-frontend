'use client';

import React from 'react';
import Image from 'next/image';

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress?: number;
  isUploading?: boolean;
}

interface UploadedFileCardProps {
  file: UploadedFile;
  onDelete?: (fileId: string) => void;
  onView?: (fileId: string) => void;
  className?: string;
}

export default function UploadedFileCard({ 
  file, 
  onDelete, 
  onView, 
  className = '' 
}: UploadedFileCardProps) {
  const getFileIcon = (fileName: string): string | null => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '/icons/pdf-02.png';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return '/icons/analytics-02.png'; // Using existing icon as placeholder for images
      case 'doc':
      case 'docx':
        return '/icons/analytics-02.png'; // Using existing icon as placeholder for documents
      case 'xls':
      case 'xlsx':
        return '/icons/analytics-02.png'; // Using existing icon as placeholder for spreadsheets
      default:
        return null; // No icon available, will use fallback
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'bg-red-100 text-red-600';
      case 'jpeg':
      case 'jpg':
      case 'png':
      case 'gif':
      case 'webp':
        return 'bg-blue-100 text-blue-600';
      case 'doc':
      case 'docx':
        return 'bg-blue-100 text-blue-600';
      case 'xls':
      case 'xlsx':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`p-4 border border-gray-200 rounded-lg bg-gray-50 ${className}`}>
      {/* File Info Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            {getFileIcon(file.name) ? (
              <Image 
                src={getFileIcon(file.name)!} 
                alt={file.type} 
                width={20} 
                height={20}
                className="object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'block';
                  }
                }}
              />
            ) : null}
            <span 
              className={`text-xs font-bold ${getFileTypeColor(file.type)}`}
              style={{ display: getFileIcon(file.name) ? 'none' : 'block' }}
            >
              {file.type}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <p className="text-xs text-gray-500">{file.size}</p>
          </div>
        </div>

        {/* Actions - Only show View button when not uploading */}
        {!file.isUploading && onView && (
          <button
            onClick={() => onView(file.id)}
            className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
          >
            View
          </button>
        )}
      </div>

      {/* Upload Progress and Delete Row - Only show when uploading */}
      {file.isUploading && (
        <div className="flex items-center justify-between w-full gap-5 mt-3">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${file.progress}%` }}
            ></div>
          </div>
          
          {/* Delete Button */}
          {onDelete && (
            <div className="flex justify-end">
              <button
                onClick={() => onDelete(file.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Delete"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
