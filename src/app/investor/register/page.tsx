'use client';

import { MultiStepForm, ProgressStepper } from "@/shared/components";
import { investorSteps, investorFormSteps } from "@/features/Investor/components/InvestorFormConfig";
import { useMultiStepForm } from "@/shared/hooks";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InvestorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const { goToStep } = useMultiStepForm(investorFormSteps);
  const router = useRouter();

  const handleFormComplete = (formData: Record<string, unknown>) => {
    console.log('Form completed with data:', formData);

    router.push('/investor/login');
    // Here you would typically submit the data to your API
    // For now, we'll just log it
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleFormDataChange = (newFormData: Record<string, unknown>) => {
    setFormData(newFormData);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-8">
          <Link href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            Product
          </Link>
          <Link href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-text text-gray-600 hover:text-[#2F2B36] transition-colors">
            Download
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Logo and Progress Stepper */}
        <div className="text-center mb-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Image src="/images/Icon & Text (1) 1.svg" alt="logo" width={100} height={100} />
            </div>
          </div>

          {/* Progress Stepper */}
          <ProgressStepper 
            steps={investorSteps} 
            currentStep={currentStep}
            onStepClick={handleStepClick}
            className="mb-8"
          />
        </div>

        {/* Multi-Step Form */}
        <MultiStepForm
          steps={investorFormSteps}
          onComplete={handleFormComplete}
          currentStep={currentStep}
          onStepChange={handleStepChange}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          className="mb-8"
        />
      </div>
    </div>
  );
}
