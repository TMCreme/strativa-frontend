'use client';

import React from 'react';
import Image from 'next/image';

interface Document {
  id: number;
  name: string;
  size: string;
  type: string;
}

interface ReviewDocumentsContentProps {
  documents: Document[];
}

export default function ReviewDocumentsContent({ documents }: ReviewDocumentsContentProps) {
  const handleView = (documentId: number) => {
    console.log('View document:', documentId);
  };

  const handleDownload = (documentId: number) => {
    console.log('Download document:', documentId);
  };

  return (
    <section className="space-y-6">
      {/* Document List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Review Documents</h2>
          <p className="text-sm text-gray-600 mt-1">Track the status of your submitted documents</p>
        </div>
        
        {/* Scrollable Document Cards */}
        <div className="max-h-96 overflow-y-auto">
          <div className="p-6 space-y-4">
            {documents.map((document) => (
              <div 
                key={document.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Document Info */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {document.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {document.size}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleView(document.id)}
                    className="text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownload(document.id)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Download"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Virtual Room Button */}
      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
          Virtual Room
        </button>
      </div>
    </section>
  );
}
