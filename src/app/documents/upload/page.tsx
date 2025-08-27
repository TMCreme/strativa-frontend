'use client';

import { RegulatoryDocumentsForm, IdentityDocumentsForm } from "@/shared/components";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RegulatoryDocumentsData {
  regulatoryLicense: File | null;
  additionalRegulatoryDoc: File | null;
  supportingRegulatoryDoc: File | null;
}

interface IdentityDocumentsData {
  representativeId: File | null;
  dragDropDocument: File | null;
  institutionalBankDetails: File | null;
  finalDocument: File | null;
}

export default function DocumentUploadPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [regulatoryData, setRegulatoryData] = useState<RegulatoryDocumentsData | null>(null);
  const router = useRouter();

  const handleRegulatoryDocumentsComplete = (formData: RegulatoryDocumentsData) => {
    setIsLoading(true);
    console.log('Regulatory documents completed:', formData);

    // Simulate API call for regulatory documents
    setTimeout(() => {
      console.log('Regulatory documents uploaded successfully!');
      setRegulatoryData(formData);
      setCurrentStep(1);
      setIsLoading(false);
    }, 1000);
  };

  const handleIdentityDocumentsComplete = (formData: IdentityDocumentsData) => {
    setIsLoading(true);
    console.log('Identity documents completed:', formData);

    // Simulate API call for identity documents
    setTimeout(() => {
      console.log('Identity documents uploaded successfully!');
      console.log('All documents uploaded successfully!');
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center">
            <Image src="/images/Icon & Text (1) 1.svg" alt="logo" width={100} height={100} />
          </div>
        </div>



        {/* Document Upload Forms */}
        {currentStep === 0 ? (
          <RegulatoryDocumentsForm
            onSubmit={handleRegulatoryDocumentsComplete}
            isLoading={isLoading}
            className="mb-8"
          />
        ) : (
          <IdentityDocumentsForm
            onSubmit={handleIdentityDocumentsComplete}
            isLoading={isLoading}
            className="mb-8"
          />
        )}
      </div>
    </div>
  );
}
