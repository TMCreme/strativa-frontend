'use client';

import { LoginForm, AuthLayout } from "@/shared/components";
import { LoginFormData } from "@/shared/validations";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InvestorLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    
    try {
      console.log('Login attempt:', formData);
      
      // For now, just simulate a successful login
      // In the future, you'll add your API call here
      setTimeout(() => {
        console.log('Login successful!');
        // Redirect to document upload page after successful login
        router.push('/documents/upload');
      }, 1000);
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <LoginForm 
        onLogin={handleLogin}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}