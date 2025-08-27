'use client';

import { NewPasswordForm, AuthLayout } from "@/shared/components";
import { NewPasswordFormData } from "@/shared/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNewPassword = async (formData: NewPasswordFormData) => {
    setIsLoading(true);
    
    try {
      console.log('New password set:', formData);
      
      // For now, just simulate setting the new password
      // In the future, you'll add your API call here
      setTimeout(() => {
        console.log('Password reset successfully!');
        // Redirect to login page after successful password reset
        router.push('/investor/login');
      }, 1000);
      
    } catch (error) {
      console.error('Failed to reset password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <NewPasswordForm 
        onSubmit={handleNewPassword}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
