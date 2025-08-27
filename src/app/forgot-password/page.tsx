'use client';

import { ForgotPasswordForm, AuthLayout } from "@/shared/components";
import { ForgotPasswordFormData } from "@/shared/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (formData: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    try {
      console.log('Forgot password request:', formData);
      
      // For now, just simulate sending the reset email
      // In the future, you'll add your API call here
      setTimeout(() => {
        console.log('Reset email sent successfully!');
        // Redirect to email verification page
        router.push('/forgot-password/verify');
      }, 1000);
      
    } catch (error) {
      console.error('Failed to send reset email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <ForgotPasswordForm 
        onSubmit={handleForgotPassword}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
