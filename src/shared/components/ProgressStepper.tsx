'use client';

import React from 'react';

export interface Step {
  id: string;
  number: string;
  title: string;
  subtitle: string;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  onStepClick?: (stepIndex: number) => void;
}

export default function ProgressStepper({ steps, currentStep, className = '', onStepClick }: ProgressStepperProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Circles and Lines Row */}
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center relative">
              <button
                onClick={() => onStepClick && index < currentStep && onStepClick(index)}
                disabled={index >= currentStep}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors relative z-10 ${
                  index < currentStep
                    ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                    : index === currentStep
                    ? 'bg-green-600 text-white cursor-default'
                    : 'bg-gray-200 text-gray-400 border-2 border-gray-300 cursor-default'
                }`}
              >
                {step.number}
              </button>
            </div>
            
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex items-center justify-center">
                <div className={`w-44 h-0.5 ${
                  index < currentStep ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Labels Row */}
      <div className="flex items-start justify-between gap-12 mt-2 ml-10">
        {steps.map((step, index) => (
          <div key={`label-${step.id}`} className="flex flex-col items-center justify-center" style={{ width: index === 0 ? '130px' : '190px' }}>
            <p className={`text-sm font-medium font-text w-[140px]  ${
              index <= currentStep ? 'text-[#2F2B36]' : 'text-gray-400'
            }`}>
              {step.title}
            </p>
            <p className={`text-xs font-text w-[300px] mt-2 ${
              index <= currentStep ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {step.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
