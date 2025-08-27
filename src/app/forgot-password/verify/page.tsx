'use client';

import { EmailVerificationForm, AuthLayout } from "@/shared/components";
import { EmailVerificationFormData } from "@/shared/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailVerificationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEmailVerification = async (formData: EmailVerificationFormData) => {
    setIsLoading(true);
    
    try {
      console.log('Email verification:', formData);
      
      // For now, just simulate verifying the code
      // In the future, you'll add your API call here
      setTimeout(() => {
        console.log('Code verified successfully!');
        // Redirect to new password page
        router.push('/forgot-password/reset');
      }, 1000);
      
    } catch (error) {
      console.error('Failed to verify code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <EmailVerificationForm 
        onSubmit={handleEmailVerification}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
