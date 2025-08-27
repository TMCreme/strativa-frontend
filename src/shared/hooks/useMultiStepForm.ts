'use client';

import { useState } from 'react';
import { FormStep } from '../components/MultiStepForm';

export function useMultiStepForm(steps: FormStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const updateFormData = (fieldId: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const reset = () => {
    setCurrentStep(0);
    setFormData({});
  };

  return {
    currentStep,
    formData,
    currentStepData: steps[currentStep],
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps.length - 1,
    totalSteps: steps.length,
    next,
    previous,
    goToStep,
    updateFormData,
    reset
  };
}
