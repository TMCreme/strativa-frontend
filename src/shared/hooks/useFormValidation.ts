import { useState } from 'react';
import { ZodSchema } from 'zod';

interface ValidationError {
  [key: string]: string;
}

export function useFormValidation<T>(schema: ZodSchema<T>) {
  const [errors, setErrors] = useState<ValidationError>({});

  const validate = (data: unknown): { success: boolean; data?: T; errors?: ValidationError } => {
    const result = schema.safeParse(data);
    
    if (result.success) {
      setErrors({});
      return { success: true, data: result.data };
    } else {
      const fieldErrors: ValidationError = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return { success: false, errors: fieldErrors };
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validate,
    clearError,
    clearAllErrors,
  };
}
